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
		setIsSubmitting(true)
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
			setIsSubmitting(false)
			return
		}
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
			<form onSubmit={handleSubmit} className="space-y-5">

				{/* Company Info */}
				<p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Company Info</p>
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
					<div>
						<label htmlFor="companyName" className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">🏢 Company Name</label>
						<input
							type="text"
							name="companyName"
							id="companyName"
							placeholder="e.g. Acme Corporation"
							onChange={(e) => setCompanyDetails({ ...companyDetails, companyName: e.target.value ?? null } as CompanyCreationForm)}
							required
							className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 text-sm transition-all duration-200 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
						/>
					</div>

					<div>
						<label htmlFor="companyEmail" className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">✉️ Email</label>
						<input
							type="email"
							name="companyEmail"
							id="companyEmail"
							placeholder="contact@company.com"
							onChange={(e) => setCompanyDetails({ ...companyDetails, companyEmail: e.target.value ?? null } as CompanyCreationForm)}
							required
							className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 text-sm transition-all duration-200 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
						/>
					</div>

					<div>
						<label htmlFor="companyPhone" className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">📞 Phone</label>
						<input
							type="tel"
							name="companyPhone"
							id="companyPhone"
							placeholder="+91 1234567890"
							onChange={(e) => setCompanyDetails({ ...companyDetails, companyPhone: e.target.value ?? null } as CompanyCreationForm)}
							className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 text-sm transition-all duration-200 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
						/>
					</div>

					<div>
						<label htmlFor="companyWebsite" className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">🌐 Website</label>
						<input
							type="url"
							name="companyWebsite"
							id="companyWebsite"
							placeholder="https://company.com"
							onChange={(e) => setCompanyDetails({ ...companyDetails, companyWebsite: e.target.value ?? null } as CompanyCreationForm)}
							className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 text-sm transition-all duration-200 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
						/>
					</div>

					<div className="sm:col-span-2">
						<label htmlFor="companyDescription" className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">📝 Description</label>
						<textarea
							name="companyDescription"
							id="companyDescription"
							rows={3}
							placeholder="Brief description of the company..."
							onChange={(e) => setCompanyDetails({ ...companyDetails, companyDescription: e.target.value ?? null } as CompanyCreationForm)}
							className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 text-sm transition-all duration-200 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 resize-none"
						/>
					</div>
				</div>

				{/* Address */}
				<div className="border-t border-slate-100 pt-4">
					<p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4">📍 Address</p>
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
						<div className="sm:col-span-2">
							<label htmlFor="street" className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Street</label>
							<input
								type="text"
								name="street"
								id="street"
								placeholder="123 Main St"
								onChange={(e) => setCompanyDetails({ ...companyDetails, companyAddress: { ...companyDetails?.companyAddress, street: e.target.value ?? null } } as CompanyCreationForm)}
								className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 text-sm transition-all duration-200 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
							/>
						</div>

						<div>
							<label htmlFor="city" className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">City</label>
							<input
								type="text"
								name="city"
								id="city"
								placeholder="New York"
								className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 text-sm transition-all duration-200 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
							/>
						</div>

						<div>
							<label htmlFor="state" className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">State</label>
							<input
								type="text"
								name="state"
								id="state"
								placeholder="NY"
								onChange={(e) => setCompanyDetails({ ...companyDetails, companyAddress: { ...companyDetails?.companyAddress, state: e.target.value ?? null } } as CompanyCreationForm)}
								className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 text-sm transition-all duration-200 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
							/>
						</div>

						<div>
							<label htmlFor="country" className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Country</label>
							<input
								type="text"
								name="country"
								id="country"
								placeholder="United States"
								onChange={(e) => setCompanyDetails({ ...companyDetails, companyAddress: { ...companyDetails?.companyAddress, country: e.target.value ?? null } } as CompanyCreationForm)}
								className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 text-sm transition-all duration-200 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
							/>
						</div>

						<div>
							<label htmlFor="zipCode" className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Zip Code</label>
							<input
								type="text"
								name="zipCode"
								id="zipCode"
								placeholder="10001"
								onChange={(e) => setCompanyDetails({ ...companyDetails, companyAddress: { ...companyDetails?.companyAddress, zipCode: e.target.value ?? null } } as CompanyCreationForm)}
								className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 text-sm transition-all duration-200 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
							/>
						</div>
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
						disabled={isSubmitting}
						className={`px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-linear-to-r from-blue-600 to-indigo-600 shadow-md transition-all duration-200 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg'}`}
					>
						{isSubmitting ? 'Creating...' : 'Create Company →'}
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
		<div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-slate-100 px-6 py-12">
			<div className="mx-auto max-w-6xl">

				{/* Header */}
				<div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
					<div>
						<p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-1">Company Directory</p>
						<h1 className="text-4xl font-bold text-slate-900">🏢 All Companies</h1>
						<p className="text-slate-500 text-sm mt-1">Logged in as User ID: <span className="font-semibold text-slate-700">{USER_ID}</span></p>
					</div>
					<div className="flex items-center gap-3">
						<button
							type="button"
							onClick={() => setCompanyCreationPopupOpen(true)}
							className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg transition-all duration-200"
						>
							+ Add Company
						</button>
						<button
							type="button"
							onClick={() => setIsLoggedIn(false)}
							className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 shadow-sm transition-all duration-200"
						>
							Logout
						</button>
					</div>
				</div>

				{companyCreationPopupOpen && (
					<CompanyCreationPopupForm onClose={() => setCompanyCreationPopupOpen(false)} onSuccess={loadCompanies}/>
				)}

				{/* States */}
				{isLoading ? (
					<div className="flex items-center justify-center py-24">
						<div className="text-center">
							<div className="animate-spin rounded-full h-14 w-14 border-b-2 border-blue-600 mx-auto mb-4"></div>
							<p className="text-slate-500 font-medium">Loading companies...</p>
						</div>
					</div>
				) : errorMessage ? (
					<div className="rounded-xl bg-red-50 border border-red-200 p-6 text-center">
						<p className="text-red-700 font-medium">⚠️ {errorMessage}</p>
					</div>
				) : companies.length === 0 ? (
					<div className="text-center py-20 bg-white rounded-2xl border border-slate-100 shadow-sm">
						<p className="text-2xl text-slate-400 font-medium">📭 No companies found</p>
						<p className="text-slate-400 text-sm mt-2">Get started by adding your first company.</p>
					</div>
				) : (
					<>
						<div className="mb-6">
							<h2 className="text-xl font-semibold text-slate-800">
								Total: <span className="text-blue-600">{companies.length}</span>
							</h2>
						</div>
						<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
							{companies.map((company) => (
								<article
									key={company.companyId}
									className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] p-6 border border-slate-100 flex flex-col"
								>
									{/* Card Header */}
									<div className="flex items-start justify-between gap-3 mb-4">
										<div className="min-w-0">
											<h2 className="text-lg font-bold text-slate-900 truncate">🏢 {company.companyName}</h2>
											<p className="text-xs text-slate-400 font-mono mt-0.5">ID: {company.companyId}</p>
										</div>
										{company.companyAddress?.country && (
											<span className="shrink-0 rounded-full bg-blue-50 border border-blue-100 px-2.5 py-1 text-xs font-semibold text-blue-700">
												{company.companyAddress.country}
											</span>
										)}
									</div>

									<div className="border-t border-slate-100 mb-4"></div>

									{/* Description */}
									<p className="text-slate-500 text-sm leading-relaxed line-clamp-3 mb-4 flex-1">
										{company.companyDescription ?? 'No description available.'}
									</p>

									{/* Details */}
									<div className="space-y-2 mb-5 text-sm">
										<div className="flex items-center gap-2 text-slate-600">
											<span className="text-slate-400 text-xs uppercase tracking-wide font-medium w-14">Email</span>
											<span className="truncate">{company.companyEmail}</span>
										</div>
										<div className="flex items-center gap-2 text-slate-600">
											<span className="text-slate-400 text-xs uppercase tracking-wide font-medium w-14">Phone</span>
											<span>{company.companyPhone ?? <span className="text-slate-300 italic">N/A</span>}</span>
										</div>
										<div className="flex items-center gap-2 text-slate-600">
											<span className="text-slate-400 text-xs uppercase tracking-wide font-medium w-14">Web</span>
											<span className="truncate">{company.companyWebsite ?? <span className="text-slate-300 italic">N/A</span>}</span>
										</div>
									</div>

									{/* Action */}
									<Link
										to={`/companies/${company.companyId}`}
										className="block w-full text-center bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-sm font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 shadow-md hover:shadow-lg"
									>
										View Details →
									</Link>
								</article>
							))}
						</div>
					</>
				)}
			</div>
		</div>
	)
}

export default Companies
