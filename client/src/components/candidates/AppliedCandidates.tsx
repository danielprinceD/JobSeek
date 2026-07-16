import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
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
    
    const getStatusBadgeColor = (status: string) => {
        switch (status?.toUpperCase()) {
            case 'APPLIED':
                return 'bg-blue-100 text-blue-800 border border-blue-200';
            case 'SCHEDULED':
                return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
            case 'COMPLETED':
                return 'bg-green-100 text-green-800 border border-green-200';
            case 'REJECTED':
                return 'bg-red-100 text-red-800 border border-red-200';
            default:
                return 'bg-gray-100 text-gray-800 border border-gray-200';
        }
    };

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
                if(candidates.length === 0){
                    setErrorMessage('No candidates have applied for this job yet.');
                }
            } catch (error) {
                setErrorMessage('Failed to load applied candidates');
            }
        }
        
        loadAppliedCandidates();
    }, [jobId]);    

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 px-6 py-12 text-slate-900">
            <div className="mx-auto max-w-6xl">
                {/* Header Section */}
                <div className="mb-10">
                    <h1 className="text-4xl font-bold mb-2">Applied Candidates</h1>
                    <p className="text-slate-600 text-lg">Job ID: <span className="font-semibold text-blue-600">{jobId}</span></p>
                </div>

                {/* Error Message */}
                {errorMessage && (
                    <div className="mb-8 p-6 rounded-lg bg-amber-50 border border-amber-200">
                        <p className="text-amber-900 text-center font-medium">⚠️ {errorMessage}</p>
                    </div>
                )}

                {/* Candidates Grid */}
                {appliedCandidates.length > 0 ? (
                    <>
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="text-2xl font-semibold text-slate-800">
                                👥 Total Applicants: <span className="text-blue-600">{appliedCandidates.length}</span>
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {appliedCandidates.map((candidate) => (
                                <div 
                                    key={candidate.jobApplyId}
                                    className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 p-6 border border-slate-100"
                                >
                                    {/* Candidate Header */}
                                    <div className="mb-4">
                                        <h3 className="text-xl font-bold text-slate-900 mb-2">
                                            👤 {candidate.user.firstName} {candidate.user.lastName}
                                        </h3>
                                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadgeColor(candidate.status)}`}>
                                            {candidate.status}
                                        </span>
                                    </div>

                                    {/* Divider */}
                                    <div className="border-t border-slate-200 my-4"></div>

                                    {/* Candidate Info */}
                                    <div className="space-y-3 mb-6">
                                        <div>
                                            <p className="text-slate-500 text-xs font-medium uppercase tracking-wide mb-1">Email</p>
                                            <p className="text-slate-700 text-sm break-all hover:text-blue-600 cursor-pointer">
                                                {candidate.user.email}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-slate-500 text-xs font-medium uppercase tracking-wide mb-1">Username</p>
                                            <p className="text-slate-700 text-sm font-mono">{candidate.user.username}</p>
                                        </div>

                                        <div>
                                            <p className="text-slate-500 text-xs font-medium uppercase tracking-wide mb-1">Role</p>
                                            <p className="text-slate-700 text-sm">{candidate.user.userRole?.roleType || 'N/A'}</p>
                                        </div>
                                    </div>

                                    {/* Action Button */}
                                    <Link 
                                        to={`/interview/${candidate.jobApplyId}`}
                                        className="block w-full text-center bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 shadow-md hover:shadow-lg"
                                    >
                                        View Profile & Interview Details →
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </>
                ) : !errorMessage ? (
                    <div className="text-center py-16">
                        <p className="text-2xl text-slate-600 font-medium">Loading candidates...</p>
                    </div>
                ) : null}
            </div>
        </div>
    );
}