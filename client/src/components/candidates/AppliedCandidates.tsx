import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_BASE_URL, USER_ID } from "../../../properties";


type CanditateListType = {
    jobApplyId: number;
    status: string;
    user: {
        email: string;
        firstName: string;
        lastName: string;
        userId: number;
        userRole: {
            permissions: null | string[];
            roleId: number;
            roleStatus: string;
            roleType: string;
        };
        username: string;
    };  

}



export function AppliedCandidates() {
    const { jobId } = useParams<{ jobId: string }>();
    const [appliedCandidates, setAppliedCandidates] = useState<CanditateListType[]>([]);
    const [errorMessage, setErrorMessage] = useState('');
    
    useEffect(() => {
        async function loadAppliedCandidates() {
            try {
                const response = await fetch(`${API_BASE_URL}/jobs/${jobId}/apply`, {
                    headers: {
                        'userId': USER_ID, // Replace with the actual user ID if needed
                    },
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                const appliedCandidatesData = data?.result || {};
                const candidates = appliedCandidatesData?.users || [];
                setAppliedCandidates(candidates);
            } catch (error) {
                setErrorMessage('Failed to load applied candidates');
            }
        }
        
        loadAppliedCandidates();
    }, [jobId]);    

    return (
        <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#dbeafe,_#eff6ff_35%,_#f8fafc_75%)] px-6 py-10 text-slate-900">
            <div className="mx-auto max-w-5xl">
                <div className="rounded-[2rem] border border-white/70 bg-white/80 p-8 shadow-[0_30px_80px_rgba(30,41,59,0.12)] backdrop-blur sm:p-10">
                    {errorMessage && <p>{errorMessage}</p>}
                    {appliedCandidates.length > 0 ? (
                        <>
                            <h1 className="text-4xl font-semibold tracking-tight text-slate-900 mb-4">Applied Candidates for Job {jobId}</h1>
                            <div>
                                {appliedCandidates.map((candidate) => (
                                    <div className="border border-gray-300 rounded p-4 mb-4" key={candidate.jobApplyId}>
                                        <h2 className="text-2xl font-semibold tracking-tight text-slate-900 mb-2">{candidate.user.firstName} {candidate.user.lastName}</h2>
                                        <p className="text-lg font-medium text-slate-700 mb-2">Email: {candidate.user.email}</p>
                                        <p className="text-lg font-medium text-slate-700 mb-2">Status: {candidate.status}</p>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <p>No candidates have applied for this job yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
}