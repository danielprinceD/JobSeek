import { useEffect, useState, type JSX } from "react";
import { Link, useParams } from "react-router-dom";
import { API_BASE_URL, USER_ID } from "../../../properties";
import type { JobCreationForm } from "../types/FormType";
import { FormPopupTemplate } from "../Utils/FormPopupTemplate";
import { MessagePopup } from "../Utils/MessagePopup";

type JobListType = {
    jobDescription: string | null;
    jobId: number;
    jobLocation: string;
    jobStatus: string;
    jobTitle: string;
}



export function DepartmentJobDetailsPage() {
    const { departmentId } = useParams<{ departmentId: string }>();
    const [jobList, setJobList] = useState<JobListType[] | null>(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [departmentJobPopupOpen, setDepartmentJobPopupOpen] = useState(false);
    const [messagePopupElement , setMessagePopupElement] = useState<JSX.Element | null>(null);

    const getStatusBadgeColor = (status: string) => {
        switch (status?.toUpperCase()) {
            case 'OPEN':
                return 'bg-green-100 text-green-800';
            case 'CLOSED':
                return 'bg-red-100 text-red-800';
            case 'PENDING':
                return 'bg-yellow-100 text-yellow-800';
            case 'FILLED':
                return 'bg-blue-100 text-blue-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const handleJobApply = async (e: React.MouseEvent<HTMLButtonElement>, jobId: number) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_BASE_URL}/jobs/${jobId}/apply`, {
            method: 'POST',
            headers: {
                'userId': USER_ID,
                'Content-Type': 'application/json',
            },
            });
            if (!response.ok) {
                const data = await response.json();
                if (data && data['result']) {
                    throw new Error(data.message);
                }
                throw new Error('Failed to apply for the job');
            }

            setMessagePopupElement(
                <MessagePopup
                    subject="Job Application Successful"
                    body="You have successfully applied for the job."
                    messageType="success"
                    popupSeconds={5}
                    onClose={() => setMessagePopupElement(null)}
                />
            )
            
        }
        catch (error) {
            if (error instanceof Error) {
                setErrorMessage(error.message);
            } else {
                setErrorMessage('An unknown error occurred while applying for the job');
            }
            setMessagePopupElement(
                    <MessagePopup
                        subject="Job Application Failed"
                        body={error instanceof Error ? error.message : 'Failed to apply for the job'}
                        messageType="error"
                        popupSeconds={5}
                        onClose={() => setMessagePopupElement(null)}
                    />
                );
        }

    }

     async function loadDepartmentDetails() {
            try {
                setLoading(true);
                const response = await fetch(`${API_BASE_URL}/departments/${departmentId}/jobs`, {
                    headers: {
                        'userId': USER_ID, // Replace with the actual user ID if needed
                    },
                });
                
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setJobList(data.result);
            } catch (error) {
                setErrorMessage('Failed to load department details');
            } finally {
                setLoading(false);
            }
        }

    useEffect(() => {
        loadDepartmentDetails();
    }
, [departmentId]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-xl text-slate-600 font-medium">Loading jobs...</p>
                </div>
            </div>
        );
    }

    return (
        <>
        {messagePopupElement}
        
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 px-6 py-12 text-slate-900">
            <div className="mx-auto max-w-6xl">
                {/* Header Section */}
                <div className="mb-10">
                    <h1 className="text-4xl font-bold mb-2">📊 Department Jobs</h1>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300" onClick={() => setDepartmentJobPopupOpen(true)}>
                        Add Job
                    </button>
                    <p className="text-slate-600 text-lg">Department ID: <span className="font-semibold text-blue-600">{departmentId}</span></p>
                </div>
                
                {departmentJobPopupOpen && (
                    <DepartmentJobCreationPopupForm
                        onClose={() => setDepartmentJobPopupOpen(false)}
                        onSuccess={loadDepartmentDetails}
                        departmentId={departmentId || ''}
                    />
                )}

                {/* Error Message */}
                {errorMessage && (
                    <div className="mb-8 p-6 rounded-lg bg-red-50 border border-red-200">
                        <p className="text-red-900 text-center font-medium">⚠️ {errorMessage}</p>
                    </div>
                )}

                {/* Jobs Grid */}
                {jobList && jobList.length > 0 ? (
                    <>
                        <div className="mb-8 flex items-center justify-between">
                            <h2 className="text-2xl font-semibold text-slate-800">
                                💼 Total Positions: <span className="text-blue-600">{jobList.length}</span>
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {jobList.map((job) => (
                                <div 
                                    key={job.jobId}
                                    className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 p-6 border border-slate-100"
                                >
                            
                                    {/* Job Header */}
                                    <div className="mb-4">
                                        <h3 className="text-xl font-bold text-slate-900 mb-2">
                                            💼 {job.jobTitle}
                                        </h3>
                                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadgeColor(job.jobStatus)}`}>
                                            {job.jobStatus}
                                        </span>
                                    </div>

                                    {/* Divider */}
                                    <div className="border-t border-slate-200 my-4"></div>

                                    {/* Job Info */}
                                    <div className="space-y-4 mb-6">
                                        <div>
                                            <p className="text-slate-500 text-xs font-medium uppercase tracking-wide mb-1">📍 Location</p>
                                            <p className="text-slate-700 text-sm font-medium">{job.jobLocation}</p>
                                        </div>

                                        <div>
                                            <p className="text-slate-500 text-xs font-medium uppercase tracking-wide mb-1">📝 Description</p>
                                            <p className="text-slate-700 text-sm leading-relaxed line-clamp-3">
                                                {job.jobDescription || 'No description available'}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-slate-500 text-xs font-medium uppercase tracking-wide mb-1">Job ID</p>
                                            <p className="text-slate-700 font-mono text-sm">{job.jobId}</p>
                                        </div>
                                    </div>

                                    {/* Action Button */}
                                    <Link 
                                        to={`/jobs/${job.jobId}/candidates`}
                                        className="block w-full text-center bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 shadow-md hover:shadow-lg"
                                    >
                                        View Candidates →
                                    </Link>

                                    <button onClick={(e)=>handleJobApply(e , job.jobId)} className="mt-4 w-full text-center bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 shadow-md hover:shadow-lg">
                                        Apply
                                    </button>

                                </div>
                            ))}
                        </div>
                    </>
                ) : jobList && jobList.length === 0 ? (
                    <div className="text-center py-16 bg-slate-50 rounded-lg">
                        <p className="text-2xl text-slate-600 font-medium">📭 No jobs available in this department</p>
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <p className="text-2xl text-slate-600 font-medium">❌ Failed to load jobs</p>
                    </div>
                )}
            </div>
        </div>
        </>
    );
}


function DepartmentJobCreationPopupForm({ onClose , onSuccess , departmentId }: { onClose: () => void; onSuccess: () => void; departmentId: string }) {
    const [jobDetails , setJobDetails] = useState<JobCreationForm>({ } as JobCreationForm);
    const [errorMessage , setErrorMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage('');

        try {
            const response = await fetch(`${API_BASE_URL}/departments/${departmentId}/jobs`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'userId': USER_ID, // Replace with the actual user ID if needed
                },
                body: JSON.stringify(jobDetails),
            });

            if (!response.ok) {
                const errorData = await response.json();
                if(errorData && errorData['result']) {
                    if(errorData['result'] instanceof Object) {
                        const errorMessages = Object.values(errorData['result']).flat().join(' ');
                        throw new Error(errorMessages);
                    }
                    else 
                        throw new Error( errorData['result'] || 'Failed to create job');
                }
                throw new Error('Failed to create job');
            }

            // Job created successfully
            onClose();
            onSuccess(); // Refresh the job list after successful creation
        } catch (error) {
            setErrorMessage(error.message || 'Failed to create job');
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setJobDetails(prevDetails => ({
            ...prevDetails,
            [name]: value
        }));
    };

    return (
        <FormPopupTemplate onClose={onClose} title="Create New Job" subtitle="Fill in the details below to create a new job." errorMessage={errorMessage}>
            <form onSubmit={handleSubmit} className="space-y-5">

                {/* Job Title */}
                <div className="group">
                    <label htmlFor="jobTitle" className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                        💼 Job Title
                    </label>
                    <input
                        type="text"
                        name="jobTitle"
                        id="jobTitle"
                        placeholder="e.g. Senior Frontend Engineer"
                        value={jobDetails.jobTitle || ''}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 text-sm transition-all duration-200 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                    />
                </div>

                {/* Job Location */}
                <div className="group">
                    <label htmlFor="jobLocation" className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                        📍 Location
                    </label>
                    <input
                        type="text"
                        name="jobLocation"
                        id="jobLocation"
                        placeholder="e.g. Remote, New York, London"
                        value={jobDetails.jobLocation || ''}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 text-sm transition-all duration-200 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                    />
                </div>

                {/* Job Description */}
                <div className="group">
                    <label htmlFor="jobDescription" className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                        📝 Description
                    </label>
                    <textarea
                        name="jobDescription"
                        id="jobDescription"
                        rows={4}
                        placeholder="Describe the role, responsibilities, and requirements..."
                        value={jobDetails.jobDescription || ''}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 text-sm transition-all duration-200 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 resize-none"
                    />
                </div>

                {/* Job Status */}
                <div className="group">
                    <label htmlFor="jobStatus" className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                        🏷️ Status
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                        {[
                            { value: 'open',    label: 'Open',    color: 'bg-green-50 border-green-200 text-green-700 peer-checked:bg-green-500 peer-checked:text-white peer-checked:border-green-500' },
                            { value: 'pending', label: 'Pending', color: 'bg-yellow-50 border-yellow-200 text-yellow-700 peer-checked:bg-yellow-400 peer-checked:text-white peer-checked:border-yellow-400' },
                            { value: 'filled',  label: 'Filled',  color: 'bg-blue-50 border-blue-200 text-blue-700 peer-checked:bg-blue-500 peer-checked:text-white peer-checked:border-blue-500' },
                            { value: 'closed',  label: 'Closed',  color: 'bg-red-50 border-red-200 text-red-700 peer-checked:bg-red-500 peer-checked:text-white peer-checked:border-red-500' },
                        ].map(({ value, label, color }) => (
                            <label key={value} className="cursor-pointer">
                                <input
                                    type="radio"
                                    name="jobStatus"
                                    value={value}
                                    checked={jobDetails.jobStatus === value}
                                    onChange={handleInputChange}
                                    className="peer sr-only"
                                    required={!jobDetails.jobStatus}
                                />
                                <span className={`flex items-center justify-center py-2.5 rounded-xl border text-xs font-semibold transition-all duration-200 select-none ${color} ${jobDetails.jobStatus === value ? 'ring-2 ring-offset-1 ring-current' : 'hover:opacity-80'}`}>
                                    {label}
                                </span>
                            </label>
                        ))}
                    </div>
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
                        className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg transition-all duration-200"
                    >
                        Create Job →
                    </button>
                </div>
            </form>
        </FormPopupTemplate>
    );

}