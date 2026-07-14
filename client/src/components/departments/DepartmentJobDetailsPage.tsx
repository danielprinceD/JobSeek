import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_BASE_URL, USER_ID } from "../../../properties";


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

    useEffect(() => {
        async function loadDepartmentDetails() {
            try {
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
            }
        }
        
        loadDepartmentDetails();
    }
, [departmentId]);

return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#dbeafe,_#eff6ff_35%,_#f8fafc_75%)] px-6 py-10 text-slate-900">
        <div className="mx-auto max-w-5xl">
            <div className="rounded-[2rem] border border-white/70 bg-white/80 p-8 shadow-[0_30px_80px_rgba(30,41,59,0.12)] backdrop-blur sm:p-10">
                {errorMessage && <p>{errorMessage}</p>}
                {jobList ? (
                    <div>
                        {jobList.map((job) => (
                            <div key={job.jobId}>
                                <h1 className="text-4xl font-semibold tracking-tight text-slate-900 mb-4">{job.jobTitle}</h1>
                                <p className="text-lg font-medium text-slate-700">{job.jobDescription}</p>
                                <p className="text-lg font-medium text-slate-700">{job.jobLocation}</p>
                                <p className="text-lg font-medium text-slate-700">{job.jobStatus}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-lg font-medium text-slate-700">Loading department details...</p>
                )}
            </div>
        </div>
    </div>
);
}