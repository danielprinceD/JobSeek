import { useEffect, useState } from 'react'
import type { Company as CompanyData, CompaniesResponse } from './company.types'
import { Link } from 'react-router-dom'
import { API_BASE_URL , USER_ID } from '../../../properties'
import type { CompanyCreationForm } from '../types/FormType'
import { FormPopupTemplate } from '../Utils/FormPopupTemplate'


type CompanyPageProps = {
	setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}


function CompanyCreationPopupForm({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
	const [companyDetails , setCompanyDetails] = useState<CompanyCreationForm | null>({} as CompanyCreationForm)
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const response = await fetch(`${API_BASE_URL}/companies`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'userId' : USER_ID,
			},
			body: JSON.stringify(companyDetails),
		})

		const data = await response.json()
		
		console.log('Response:', response)
		console.log('Data:', data)

		if (!response.status || response.status !== 201) {
			if (data && data['result'] ) {
				setErrorMessage(data['result'])
			} else {
				setErrorMessage('Failed to create company. Please try again.')
			}
			return
		}
		// Handle form submission here
		onClose()
		onSuccess()
	}

	return (
		<FormPopupTemplate
			title="Add Company"
			subtitle="Fill in the details below to create a new company."
			onClose={onClose}
			errorMessage={errorMessage}
		>
			<form onSubmit={handleSubmit} className="space-y-6">
					
					{/* Form Fields */}
					<div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
						<div>
							<label htmlFor="companyName" className="block text-sm font-medium text-slate-700">Company Name</label>
							<input
								type="text"
								name="companyName"
								id="companyName"
								onChange={(e) => setCompanyDetails({ ...companyDetails, companyName: e.target.value ?? null } as CompanyCreationForm)}
								required
								className="mt-1 block w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
							/>
						</div>

						<div>
							<label htmlFor="companyEmail" className="block text-sm font-medium text-slate-700">Company Email</label>
							<input
								type="email"
								name="companyEmail"
								id="companyEmail"
								onChange={(e) => setCompanyDetails({ ...companyDetails, companyEmail: e.target.value ?? null } as CompanyCreationForm)}
								required
								className="mt-1 block w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
							/>
						</div>
						
						<div>
							<label htmlFor="companyPhone" className="block text-sm font-medium text-slate-700">Company Phone</label>
							<input
								type="tel"
								name="companyPhone"
								id="companyPhone"
								onChange={(e) => setCompanyDetails({ ...companyDetails, companyPhone: e.target.value ?? null } as CompanyCreationForm)}
								className="mt-1 block w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
							/>
						</div>

						<div>
							<label htmlFor="companyWebsite" className="block text-sm font-medium text-slate-700">Company Website</label>
							<input
								type="url"
								name="companyWebsite"
								id="companyWebsite"
								onChange={(e) => setCompanyDetails({
								...companyDetails,
								companyWebsite : e.target.value ?? null
								} as CompanyCreationForm)}
								className="mt-1 block w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
							/>
						</div>
						
						<div className="sm:col-span-2">
							<label htmlFor="companyDescription" className="block text-sm font-medium text-slate-700">Company Description</label>
							<textarea
								name="companyDescription"
								id="companyDescription"
								rows={4}
								onChange={(e) => setCompanyDetails({ ...companyDetails, companyDescription: e.target.value ?? null } as CompanyCreationForm)}
								className="mt-1 block w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
							></textarea>
						</div>

						<div>
							<label htmlFor="state" className="block text-sm font-medium text-slate-700">State</label>
							<input
								type="text"
								onChange={(e) => setCompanyDetails({ 
								...companyDetails,  
								companyAddress : { 
									...companyDetails?.companyAddress,  
									state : e.target.value ?? null
								} 
								} as CompanyCreationForm)}
								name="state"
								id="state"
								className="mt-1 block w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
							/>
						</div>

						<div>
							<label htmlFor="country" className="block text-sm font-medium text-slate-700">Country</label>
							<input
								type="text"
								name="country"
								id="country"
								onChange={(e) => setCompanyDetails({ 
								...companyDetails,  
								companyAddress : { 
									...companyDetails?.companyAddress,  
									country : e.target.value ?? null
								} 
								} as CompanyCreationForm)}
								className="mt-1 block w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
							/>
						</div>

						<div>
							<label htmlFor="street" className="block text-sm font-medium text-slate-700">Street</label>
							<input
								type="text"
								name="street"
								id="street"
								onChange={(e) => setCompanyDetails({
								...companyDetails,
								companyAddress : {
									...companyDetails?.companyAddress,
									street : e.target.value ?? null
								}
								} as CompanyCreationForm)}
								className="mt-1 block w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
							/>
						</div>

						<div>
							<label htmlFor="city" className="block text-sm font-medium text-slate-700">City</label>
							<input
								type="text"
								name="city"
								id="city"
								className="mt-1 block w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
							/>
						</div>

						<div>
							<label htmlFor="zipCode" className="block text-sm font-medium text-slate-700">Zip Code</label>
							<input
								type="text"
								name="zipCode"
								id="zipCode"
								onChange={(e) => setCompanyDetails({
								...companyDetails,
								companyAddress : {
									...companyDetails?.companyAddress,
									zipCode : e.target.value ?? null
								}
								} as CompanyCreationForm)}
								className="mt-1 block w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
							/>
						</div>

					</div>
					
					<div className="flex items-center justify-end gap-4">
						<button
							type="button"
							onClick={onClose}
							className="rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200 transition-colors duration-200"
						>
							Cancel
						</button>
						<button
							type="submit"
							disabled={isSubmitting}
							className={`rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
						>
							{isSubmitting ? 'Creating...' : 'Create Company'}
						</button>
					</div>
					

				</form>
		</FormPopupTemplate>
	)
	
}

function Companies({ setIsLoggedIn }: CompanyPageProps) {
	const [companies, setCompanies] = useState<CompanyData[]>([])
	const [companyCreationPopupOpen, setCompanyCreationPopupOpen] = useState(false)
	const [isLoading, setIsLoading] = useState(true)
	const [errorMessage, setErrorMessage] = useState('')

	async function loadCompanies() {
		try {
			setIsLoading(true)
			setErrorMessage('')

			const response = await fetch(`${API_BASE_URL}/companies`, {
			
				headers: {
					userId: USER_ID ,
				},
			})

			if (!response.ok) {
				throw new Error(`Request failed with status ${response.status}`)
			}

			const data: CompaniesResponse = await response.json()
			setCompanies(Array.isArray(data.result) ? data.result : [])
		} catch (error) {
			if (error instanceof DOMException && error.name === 'AbortError') {
				return
			}

			setErrorMessage('Unable to load companies right now.')
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		loadCompanies()
	}, [])

	return (
		<main className="min-h-screen bg-[radial-gradient(circle_at_top,_#dbeafe,_#eff6ff_35%,_#f8fafc_75%)] px-6 py-10 text-slate-900">
			<div className="mx-auto max-w-5xl">
				<div className="rounded-[2rem] border border-white/70 bg-white/80 p-8 shadow-[0_30px_80px_rgba(30,41,59,0.12)] backdrop-blur sm:p-10">
					<div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
						<div className="space-y-3">
							<p className="text-sm font-medium uppercase tracking-[0.25em] text-sky-700">
								Company directory
							</p>
							<h1 className="text-4xl font-semibold tracking-tight text-slate-900">
								All companies
							</h1>

						</div>
						<div className="flex items-center gap-4">
							<p className="text-sm text-slate-500">Logged in as User ID: {USER_ID}</p>
						</div>
					</div>

					<div className="mt-6 flex items-center justify-between gap-4 sm:mt-8">
						<div className="flex items-center gap-2">
							<p className="text-sm text-slate-500">Total companies:</p>
							<p className="text-sm font-medium text-slate-900">{companies.length}</p>
						</div>
						

						<button
							type="button"
							onClick={() => setIsLoggedIn(false) }
							className="inline-flex h-fit items-center justify-center rounded-2xl bg-slate-900 px-5 py-3 text-base font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-300"
						>
							Logout
						</button>
					</div>

					
					<div className="mt-6">
						<button
							type="button"
							onClick={() => setCompanyCreationPopupOpen(true)}
							className="inline-flex h-fit items-center justify-center rounded-2xl bg-slate-900 px-5 py-3 text-base font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-300"
						>
							Add Company
						</button>
					</div>

					{companyCreationPopupOpen && (
						<CompanyCreationPopupForm onClose={() => setCompanyCreationPopupOpen(false)} onSuccess={loadCompanies}/>
					)}
					

					{isLoading ? (
						<div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-8 text-sm text-slate-500">
							Loading companies...
						</div>
					) : errorMessage ? (
						<div className="mt-8 rounded-3xl border border-red-200 bg-red-50 p-8 text-sm text-red-700">
							{errorMessage}
						</div>
					) : companies.length === 0 ? (
						<div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-8 text-sm text-slate-500">
							No companies found.
						</div>
					) : (
						<div className="mt-8 grid gap-5 sm:grid-cols-2">
							{companies.map((company) => (
								<article key={company.companyId} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
									<div className="flex items-start justify-between gap-3">
										<div>
											<h2 className="text-xl font-semibold tracking-tight text-slate-900">{company.companyName}</h2>
											<p className="mt-1 text-sm text-slate-500">ID: {company.companyId}</p>
										</div>
										<span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-sky-700">
											{company.companyAddress?.country ?? 'Country n/a'}
										</span>
									</div>

									<p className="mt-4 text-sm leading-6 text-slate-600">
										{company.companyDescription ?? 'No company description is available yet.'}
									</p>

									<div className="mt-5 grid gap-3 text-sm text-slate-700">
										<p>
											<span className="font-medium text-slate-500">Email:</span> {company.companyEmail}
										</p>
										<p>
											<span className="font-medium text-slate-500">Phone:</span> {company.companyPhone ?? 'Not provided'}
										</p>
										<p>
											<span className="font-medium text-slate-500">Website:</span> {company.companyWebsite ?? 'Not provided'}
										</p>


										
									</div>
									
									<Link to={`/companies/${company.companyId}`}
										className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-sky-700 transition hover:text-sky-800"
									>
										View details
										<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4">
											<path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
										</svg>
									</Link>


								</article>
							))}
						</div>
					)}
				</div>
			</div> 
		</main>
	)
}

export default Companies
