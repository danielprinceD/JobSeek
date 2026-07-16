import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_BASE_URL, USER_ID } from "../../../properties";
import { DepartmentList } from "../departments/DepartmentList";

interface CompanyDetailPageProps {
    companyId: string;
    companyName: string;
    companyEmail: string;
    companyDescription: string | null;
    companyWebsite: string | null;
    companyPhone: string | null;
    companyAddress: {
        city: string | null;
        country: string | null;
        state: string | null;
        street: string | null;
        zipCode: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
}

function CompanyDetailPage( ) {
    
    const { companyId } = useParams();

    

    const [companyDetails, setCompanyDetails] = useState<CompanyDetailPageProps | null>(null);
    const [loading, setLoading] = useState(true);

    async function loadCompanyDetails() {
            try {
                setLoading(true);
                const response = await fetch(`${API_BASE_URL}/companies/${companyId}`, {

                    headers: {
                        'userId': USER_ID, // Replace with the actual user ID if needed
                    },
                });

                if (!response.ok) {
                    throw new Error(`Request failed with status ${response.status}`);
                }
                
                const result = (await response.json()).result;

                const data: CompanyDetailPageProps = result;

                console.log('Company details:', data);


                setCompanyDetails(data);
            } catch (error) {
                if (error instanceof Error && error.name !== 'AbortError') {
                    console.error('Failed to load company details:', error);
                }
            } finally {
                setLoading(false);
            }

            
        }

    useEffect(() => {
        loadCompanyDetails();
    } , [companyId]);
    
    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-xl text-slate-600 font-medium">Loading company details...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 px-6 py-12 text-slate-900">
            
            {companyDetails ? (
                <>
                {/* Header Section */}
                <div className="max-w-6xl mx-auto mb-10">
                    <h1 className="text-5xl font-bold mb-3">{companyDetails.companyName}</h1>
                    <p className="text-slate-600 text-lg">Company ID: <span className="font-semibold text-blue-600">{companyId}</span></p>
                </div>

                {/* Company Main Info Card */}
                <div className="max-w-6xl mx-auto mb-8">
                    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8">
                        {/* Description Section */}
                        <div className="mb-8 pb-8 border-b border-slate-200">
                            <h2 className="text-2xl font-bold text-slate-800 mb-4">📝 About Company</h2>
                            <p className="text-lg text-slate-700 leading-relaxed">
                                {companyDetails.companyDescription || 'No description provided'}
                            </p>
                        </div>

                        {/* Contact & Web Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6">
                                <p className="text-slate-500 text-sm font-medium uppercase tracking-wide mb-2">📧 Email</p>
                                <p className="text-lg font-semibold text-blue-600 break-all">
                                    {companyDetails.companyEmail}
                                </p>
                            </div>

                            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6">
                                <p className="text-slate-500 text-sm font-medium uppercase tracking-wide mb-2">☎️ Phone</p>
                                <p className="text-lg font-semibold text-slate-900">
                                    {companyDetails.companyPhone || 'Not provided'}
                                </p>
                            </div>

                            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 md:col-span-2">
                                <p className="text-slate-500 text-sm font-medium uppercase tracking-wide mb-2">🌐 Website</p>
                                <p className="text-lg font-semibold text-blue-600 break-all">
                                    {companyDetails.companyWebsite ? (
                                        <a href={companyDetails.companyWebsite} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                            {companyDetails.companyWebsite}
                                        </a>
                                    ) : 'Not provided'}
                                </p>
                            </div>
                        </div>

                        {/* Address Section */}
                        {companyDetails.companyAddress && (
                            <div className="pt-8 border-t border-slate-200">
                                <h3 className="text-xl font-bold text-slate-800 mb-4">📍 Address</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-slate-500 text-sm font-medium uppercase tracking-wide mb-1">Street</p>
                                        <p className="text-lg text-slate-800">{companyDetails.companyAddress.street || 'N/A'}</p>
                                    </div>
                                    <div>
                                        <p className="text-slate-500 text-sm font-medium uppercase tracking-wide mb-1">City</p>
                                        <p className="text-lg text-slate-800">{companyDetails.companyAddress.city || 'N/A'}</p>
                                    </div>
                                    <div>
                                        <p className="text-slate-500 text-sm font-medium uppercase tracking-wide mb-1">State</p>
                                        <p className="text-lg text-slate-800">{companyDetails.companyAddress.state || 'N/A'}</p>
                                    </div>
                                    <div>
                                        <p className="text-slate-500 text-sm font-medium uppercase tracking-wide mb-1">Zip Code</p>
                                        <p className="text-lg text-slate-800">{companyDetails.companyAddress.zipCode || 'N/A'}</p>
                                    </div>
                                    <div className="md:col-span-2">
                                        <p className="text-slate-500 text-sm font-medium uppercase tracking-wide mb-1">Country</p>
                                        <p className="text-lg text-slate-800">{companyDetails.companyAddress.country || 'N/A'}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Timestamps */}
                        <div className="mt-8 pt-6 border-t border-slate-200 text-sm text-slate-500 flex justify-between">
                            <span>Created: {new Date(companyDetails.createdAt).toLocaleDateString()}</span>
                            <span>Updated: {new Date(companyDetails.updatedAt).toLocaleDateString()}</span>
                        </div>
                    </div>
                </div>

                {/* Department List Section */}
                <div className="max-w-6xl mx-auto">
                    <DepartmentList companyId={companyId || ''} />
                    
                </div>

                </>

            ) : (
                <div className="max-w-6xl mx-auto">
                    <div className="text-center py-16">
                        <p className="text-2xl text-slate-600 font-medium">❌ Failed to load company details</p>
                    </div>
                </div>
            )}
        </div>

    );
}

export default CompanyDetailPage;