import { useEffect, useState } from 'react';
import { API_BASE_URL, USER_ID } from '../../../properties';
import { Link } from 'react-router-dom';
import type { DepartmentCreationForm } from '../types/FormType';
import { FormPopupTemplate } from '../Utils/FormPopupTemplate';

export type DepartmentListType = {
    departmentDescription: string;
    departmentId: number;
    departmentName: string;
}



export function DepartmentList({ companyId }: { companyId: string }) {
    const [ departmentPopupOpen , setDepartmentPopupOpen ] = useState(false);
  const [departments, setDepartments] = useState<DepartmentListType[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);
  
  async function loadDepartments() {
    try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/companies/${companyId}/departments`, {
            headers: {
                'userId': USER_ID , // Replace with the actual user ID if needed
            }
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const result = await response.json();
        const data: DepartmentListType[] = result?.result || [];
        setDepartments(data);
    } catch (error) {
        setErrorMessage('Failed to load departments');
    } finally {
        setLoading(false);
    }
}

  useEffect(() => {

    

    loadDepartments();
  }, [companyId]);

  if (loading) {
    return (
        <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-3"></div>
            <p className="text-lg text-slate-600 font-medium">Loading departments...</p>
        </div>
    );
  }

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between gap-4 mb-8">
        <h2 className="text-3xl font-bold text-slate-900">📁 Departments</h2>
        <button
          className="px-5 py-2.5 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-200"
          onClick={() => setDepartmentPopupOpen(true)}
        >
          + Add Department
        </button>
      </div>

        {departmentPopupOpen && (
            <DepartmentCreationPopupForm
                onClose={() => setDepartmentPopupOpen(false)}
                onSuccess={loadDepartments}
                companyId={companyId}
            />
        )}
      
      <p className="text-slate-600 text-lg mb-8">Total: <span className="font-semibold text-blue-600">{departments.length}</span></p>

      {/* Error Message */}
      {errorMessage && (
        <div className="mb-8 p-6 rounded-lg bg-red-50 border border-red-200">
            <p className="text-red-900 text-center font-medium">⚠️ {errorMessage}</p>
        </div>
      )}

      {/* Departments Grid */}
      {departments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map((department) => (
              <div 
                  key={department.departmentId}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 p-6 border border-slate-100"
              >
                  {/* Department Header */}
                  <div className="mb-4">
                      <h3 className="text-2xl font-bold text-slate-900">
                          📁 {department.departmentName}
                      </h3>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-slate-200 my-4"></div>

                  {/* Department Description */}
                  <div className="mb-6">
                      <p className="text-slate-500 text-xs font-medium uppercase tracking-wide mb-2">Description</p>
                      <p className="text-slate-700 text-sm leading-relaxed line-clamp-3">
                          {department.departmentDescription || 'No description provided'}
                      </p>
                  </div>

                  {/* Department ID */}
                  <div className="mb-6">
                      <p className="text-slate-500 text-xs font-medium uppercase tracking-wide mb-1">Department ID</p>
                      <p className="text-slate-700 font-mono text-sm">{department.departmentId}</p>
                  </div>

                  {/* Action Button */}
                  <Link 
                      to={`/departments/${department.departmentId}/jobs`}
                      className="block w-full text-center bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 shadow-md hover:shadow-lg"
                  >
                      View Jobs & Details →
                  </Link>
              </div>
          ))}
        </div>
      ) : !errorMessage ? (
        <div className="text-center py-12 bg-slate-50 rounded-lg">
            <p className="text-xl text-slate-600 font-medium">📭 No departments available</p>
        </div>
      ) : null}
    </div>
  );

}


function DepartmentCreationPopupForm({ onClose, onSuccess , companyId }: { onClose: () => void; onSuccess: () => void; companyId: string }) {
    const [departmentDetails , setDepartmentDetails] = useState<DepartmentCreationForm>({ } as DepartmentCreationForm)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setDepartmentDetails(prevDetails => ({
            ...prevDetails,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrorMessage('');

        try {
            const response = await fetch(`${API_BASE_URL}/companies/${companyId}/departments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'userId': USER_ID
                },
                body: JSON.stringify(departmentDetails)
            });

            if (!response.ok) {
                throw new Error('Failed to create department');
            }
            
            // Optionally, you can handle the response data here if needed
        } catch (error) {
            setErrorMessage('Failed to create department. Please try again.');
        } finally {
            setIsSubmitting(false);
        }

        // Handle form submission here
        onClose();
        onSuccess();
    };
    
    return (
        <FormPopupTemplate onClose={onClose} title="Create New Department" subtitle="Fill in the details below to create a new department." errorMessage={errorMessage}>
            <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Department Name */}
                <div>
                    <label htmlFor="departmentName" className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">📁 Department Name</label>
                    <input
                        type="text"
                        name="departmentName"
                        id="departmentName"
                        placeholder="e.g. Engineering, Sales, HR"
                        value={departmentDetails.departmentName || ''}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 text-sm transition-all duration-200 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                    />
                </div>

                {/* Department Description */}
                <div>
                    <label htmlFor="departmentDescription" className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">📝 Description</label>
                    <textarea
                        name="departmentDescription"
                        id="departmentDescription"
                        rows={3}
                        placeholder="Describe the department's role and responsibilities..."
                        value={departmentDetails.departmentDescription || ''}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 text-sm transition-all duration-200 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 resize-none"
                    />
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-5 py-2.5 rounded-xl text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors duration-200"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-linear-to-r from-blue-600 to-indigo-600 shadow-md transition-all duration-200 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg'}`}
                    >
                        {isSubmitting ? 'Creating...' : 'Create Department →'}
                    </button>
                </div>
            </form>
            </FormPopupTemplate>
    );
}
