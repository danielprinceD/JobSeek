import { useEffect, useState } from 'react';
import { API_BASE_URL, USER_ID } from '../../../properties';
import { Link, useParams } from 'react-router-dom';

export type DepartmentListType = {
    departmentDescription: string;
    departmentId: number;
    departmentName: string;
}



export function DepartmentList({ companyId }: { companyId: string }) {
  const [departments, setDepartments] = useState<DepartmentListType[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  
  useEffect(() => {

    async function loadDepartments() {
        try {
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
        }
    }

    loadDepartments();
  }, [companyId]);


  return (
    <div>
      <h2 className="text-2xl font-semibold tracking-tight text-slate-900 mb-4">Departments</h2>
      {errorMessage && <p>{errorMessage}</p>}
      <ul>
        {departments.map((department) => (
            <div className="border border-gray-300 rounded p-4 mb-4" key={department.departmentId}>
                <li key={department.departmentId} className="text-lg font-medium text-slate-700 mb-2">
                    Name : {department.departmentName}
                </li>

                <p className="text-lg font-medium text-slate-700 mb-2">Description : {department.departmentDescription}</p>
                

                <Link to={`/departments/${department.departmentId}/jobs`} className="text-blue-500 hover:underline">
                    View Details
                </Link>
            </div>
        ))}
      </ul>
    </div>
  );

}