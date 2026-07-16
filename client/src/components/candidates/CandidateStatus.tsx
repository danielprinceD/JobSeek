import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import type { InterviewType, JobApplyType } from "../types/JobSeekTypes";
import { API_BASE_URL, USER_ID } from "../../../properties";

/*

"result": {
        "interviewDateTime": null,
        "interviewId": 1,
        "interviewLocation": null,
        "interviewMode": "OFFLINE",
        "interviewStatus": "SCHEDULED",
        "interviewer": {
            "email": "daniel+3@gm.com",
            "firstName": "daniel",
            "lastName": "prince",
            "userId": 5,
            "username": "danielprince.d+1"
        },
        "jobApply": {
            "job": {
                "jobDescription": null,
                "jobId": 1,
                "jobLocation": "chennai",
                "jobStatus": "pending",
                "jobTitle": "qa"
            },
            "jobApplyId": 1,
            "status": "APPLIED",
            "user": {
                
                "email": "daniel+3@gm.com",
                "firstName": "daniel",
                "lastName": "prince",
                "userId": 5,
                
                "username": "danielprince.d+1"
            }
        }
    }

*/


export function CandidateStatus() {
    const { jobApplyId } = useParams<{ jobApplyId: string }>();

    const [ interviewDetails , setInterviewDetails ] = useState<InterviewType | null>(null);
    const [ jobApplyDetails , setJobApplyDetails ] = useState<JobApplyType | null>(null);
    const [ loading, setLoading ] = useState(true);

    const getStatusBadgeColor = (status: string) => {
        switch (status?.toUpperCase()) {
            case 'APPLIED':
                return 'bg-blue-100 text-blue-800';
            case 'SCHEDULED':
                return 'bg-yellow-100 text-yellow-800';
            case 'COMPLETED':
                return 'bg-green-100 text-green-800';
            case 'REJECTED':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    useEffect(() => {

        async function loadCandidateStatus() {
            try {
                setLoading(true);
                const response = await fetch(`${API_BASE_URL}/interviews?job_apply_id=${jobApplyId}` , {
                    headers: {
                       'userId' : USER_ID
                    },
                });
                const data = await response.json();
                const result = data.result;
                setInterviewDetails(result);
                setJobApplyDetails(result.jobApply);
            } catch (error) {
                console.error("Failed to load candidate status", error);
            } finally {
                setLoading(false);
            }
        }

        loadCandidateStatus();

    }, [jobApplyId]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-xl text-slate-600 font-medium">Loading candidate status...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 px-6 py-12 text-slate-900">
            {/* Header */}
            <div className="max-w-6xl mx-auto mb-10">
                <h1 className="text-4xl font-bold mb-2">Application Status</h1>
                <p className="text-slate-600 text-lg">Application ID: <span className="font-semibold text-blue-600">{jobApplyId}</span></p>
            </div>

            {/* Main Content */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Job Details Card */}
                {jobApplyDetails && (
                    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-slate-800">📋 Job Details</h2>
                            <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusBadgeColor(jobApplyDetails.status)}`}>
                                {jobApplyDetails.status}
                            </span>
                        </div>
                        
                        <div className="space-y-5">
                            <div className="border-b border-slate-200 pb-4">
                                <p className="text-slate-500 text-sm font-medium uppercase tracking-wide mb-1">Job Title</p>
                                <p className="text-xl font-semibold text-slate-900">{jobApplyDetails.job.jobTitle}</p>
                            </div>

                            <div className="border-b border-slate-200 pb-4">
                                <p className="text-slate-500 text-sm font-medium uppercase tracking-wide mb-1">Location</p>
                                <p className="text-lg text-slate-800">📍 {jobApplyDetails.job.jobLocation}</p>
                            </div>

                            <div className="border-b border-slate-200 pb-4">
                                <p className="text-slate-500 text-sm font-medium uppercase tracking-wide mb-1">Job Status</p>
                                <span className={`inline-block px-3 py-1 rounded-lg text-sm font-medium ${getStatusBadgeColor(jobApplyDetails.job.jobStatus)}`}>
                                    {jobApplyDetails.job.jobStatus}
                                </span>
                            </div>

                            <div>
                                <p className="text-slate-500 text-sm font-medium uppercase tracking-wide mb-1">Application ID</p>
                                <p className="text-slate-700 font-mono text-sm">{jobApplyId}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Interview Details Card */}
                {interviewDetails && (
                    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-slate-800">🎤 Interview Details</h2>
                            <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusBadgeColor(interviewDetails.interviewStatus)}`}>
                                {interviewDetails.interviewStatus}
                            </span>
                        </div>

                        <div className="space-y-5">
                            <div className="border-b border-slate-200 pb-4">
                                <p className="text-slate-500 text-sm font-medium uppercase tracking-wide mb-1">Interview Mode</p>
                                <p className="text-lg text-slate-800">
                                    {interviewDetails.interviewMode === 'ONLINE' ? '💻' : '🏢'} {interviewDetails.interviewMode}
                                </p>
                            </div>

                            <div className="border-b border-slate-200 pb-4">
                                <p className="text-slate-500 text-sm font-medium uppercase tracking-wide mb-1">Date & Time</p>
                                <p className="text-lg text-slate-800">
                                    🕐 {interviewDetails.interviewDateTime || 'Not Scheduled Yet'}
                                </p>
                            </div>

                            <div className="border-b border-slate-200 pb-4">
                                <p className="text-slate-500 text-sm font-medium uppercase tracking-wide mb-1">Location</p>
                                <p className="text-lg text-slate-800">
                                    {interviewDetails.interviewLocation || '📍 To be Confirmed'}
                                </p>
                            </div>

                            <div>
                                <p className="text-slate-500 text-sm font-medium uppercase tracking-wide mb-1">Interview ID</p>
                                <p className="text-slate-700 font-mono text-sm">{interviewDetails.interviewId}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Interviewer Details Section */}
            {interviewDetails && (
                <div className="max-w-6xl mx-auto mt-8">
                    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8">
                        <h2 className="text-2xl font-bold text-slate-800 mb-6">👤 Interviewer Information</h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6">
                                <p className="text-slate-500 text-sm font-medium uppercase tracking-wide mb-2">Name</p>
                                <p className="text-lg font-semibold text-slate-900">
                                    {interviewDetails.interviewer.firstName} {interviewDetails.interviewer.lastName}
                                </p>
                            </div>

                            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6">
                                <p className="text-slate-500 text-sm font-medium uppercase tracking-wide mb-2">Email</p>
                                <p className="text-lg font-semibold text-blue-600 break-all">
                                    {interviewDetails.interviewer.email}
                                </p>
                            </div>

                            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6">
                                <p className="text-slate-500 text-sm font-medium uppercase tracking-wide mb-2">Username</p>
                                <p className="text-lg font-semibold text-slate-900">
                                    {interviewDetails.interviewer.username}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
