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

    useEffect(() => {


        
        async function loadCompanyDetails() {
            try {
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
            }

            
        }

        loadCompanyDetails();

    } , [companyId]);
    
    return (
        <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#dbeafe,_#eff6ff_35%,_#f8fafc_75%)] px-6 py-10 text-slate-900">
            
            
            <p className="text-lg font-medium text-slate-700 mb-4">Company ID: {companyId}</p>

            {companyDetails ? (
                <>
                <div className="rounded-[2rem] border border-white/70 bg-white/80 p-8 shadow-[0_30px_80px_rgba(30,41,59,0.12)] backdrop-blur sm:p-10">
                    <h1 className="text-4xl font-semibold tracking-tight text-slate-900 mb-6">{companyDetails.companyName}</h1>
                    <p className="text-lg font-medium text-slate-700 mb-2">Email: {companyDetails.companyEmail}</p>
                    <p className="text-lg font-medium text-slate-700 mb-2">Description: {companyDetails.companyDescription}</p>
                    <p className="text-lg font-medium text-slate-700 mb-2">Website: {companyDetails.companyWebsite}</p>
                    <p className="text-lg font-medium text-slate-700 mb-2">Phone: {companyDetails.companyPhone}</p>
                    <p className="text-lg font-medium text-slate-700 mb-2">Address: {companyDetails.companyAddress?.street}, {companyDetails.companyAddress?.city}, {companyDetails.companyAddress?.state}, {companyDetails.companyAddress?.zipCode}, {companyDetails.companyAddress?.country}</p>
                </div>

                <div className="mt-8">
                    <DepartmentList companyId={companyId || ''} />
                </div>

                </>

            ) : (
                <p className="text-lg font-medium text-slate-700">Loading company details...</p>
            )}
        </div>

    );
}

export default CompanyDetailPage;