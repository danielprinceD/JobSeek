import { useEffect, useState, type JSX } from "react";
import { Link, useParams } from "react-router-dom";
import { API_BASE_URL, USER_ID } from "../../../properties";
import type { InterviewScheduleForm } from "../types/FormType";
import { FormPopupTemplate } from "../Utils/FormPopupTemplate";


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
    const [interviewSchecduleFormPopup, setInterviewSchecduleFormPopup] = useState<JSX.Element | null>(null);
    
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
            {interviewSchecduleFormPopup}
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
                                    <div className="space-y-3">
                                        <Link 
                                            to={`/interview/${candidate.jobApplyId}`}
                                            className="block w-full text-center bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 shadow-md hover:shadow-lg"
                                        >
                                            View Profile & Interview Details →
                                        </Link>
                                        
                                        <button onClick={() => setInterviewSchecduleFormPopup(
                                            <InterviewScheduleFormPopup 
                                                onClose={() => setInterviewSchecduleFormPopup(null)}
                                                userId={candidate.user.userId}
                                                jobApplyId={candidate.jobApplyId}
                                            />
                                        )} className="block w-full text-center bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 shadow-md hover:shadow-lg">
                                            Schedule Interview
                                        </button>
                                    </div>
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


function InterviewScheduleFormPopup({ onClose , userId , jobApplyId }: { onClose: () => void , userId: number , jobApplyId: number }) {
    
    const [ interviewDetails , setInterviewDetails ] = useState<InterviewScheduleForm>({
        jobApplyId: jobApplyId,
        interviewDateTime: '',
        interviewLocation: null,
        interviewMode: null,
        interviewStatus: null,
        interviewerUserId: userId,
    });
    const [errorMessage, setErrorMessage] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setInterviewDetails(prevDetails => ({
            ...prevDetails,
            [name]: value
        }));
    };
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage('');
        try {
            const response = await fetch(`${API_BASE_URL}/interviews`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'userId': USER_ID,
                },
                body: JSON.stringify(interviewDetails),
            });

            if (!response.ok) {
                throw new Error('Failed to schedule interview');
            }

            onClose();
        } catch (error) {
            setErrorMessage(error instanceof Error ? error.message : 'Failed to schedule interview');
        }
    };

    return (
        <FormPopupTemplate
            onClose={onClose}
            title="Schedule Interview"
            subtitle="Set up an interview session for this candidate."
            errorMessage={errorMessage}
        >
            <form onSubmit={handleSubmit} className="space-y-5">

                {/* Date & Time */}
                <div>
                    <label htmlFor="interviewDateTime" className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                        🗓️ Date &amp; Time
                    </label>
                    <input
                        type="datetime-local"
                        id="interviewDateTime"
                        name="interviewDateTime"
                        value={interviewDetails.interviewDateTime || ''}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm transition-all duration-200 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                    />
                </div>

                {/* Location */}
                <div>
                    <label htmlFor="interviewLocation" className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                        📍 Location
                    </label>
                    <input
                        type="text"
                        id="interviewLocation"
                        name="interviewLocation"
                        placeholder="e.g. Conference Room B, Zoom link..."
                        value={interviewDetails.interviewLocation || ''}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 text-sm transition-all duration-200 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                    />
                </div>

                {/* Interview Mode */}
                <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                        🖥️ Mode
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                        {[
                            { value: 'ONLINE',  label: 'Online',  color: 'bg-blue-50 border-blue-200 text-blue-700' },
                            { value: 'OFFLINE', label: 'Offline', color: 'bg-slate-50 border-slate-200 text-slate-700' },
                            { value: 'HYBRID',  label: 'Hybrid',  color: 'bg-purple-50 border-purple-200 text-purple-700' },
                        ].map(({ value, label, color }) => (
                            <label key={value} className="cursor-pointer">
                                <input
                                    type="radio"
                                    name="interviewMode"
                                    value={value}
                                    checked={interviewDetails.interviewMode === value}
                                    onChange={handleInputChange}
                                    className="peer sr-only"
                                    required={!interviewDetails.interviewMode}
                                />
                                <span className={`flex items-center justify-center py-2.5 rounded-xl border text-xs font-semibold transition-all duration-200 select-none ${color} ${interviewDetails.interviewMode === value ? 'ring-2 ring-offset-1 ring-current opacity-100' : 'opacity-70 hover:opacity-100'}`}>
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
                        className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 shadow-md hover:shadow-lg transition-all duration-200"
                    >
                        Schedule →
                    </button>
                </div>
            </form>
        </FormPopupTemplate>
    );


}