import { useEffect, useState } from 'react'
import type { Company as CompanyData, CompaniesResponse } from './company.types'
import { Link } from 'react-router-dom'
import { API_BASE_URL , USER_ID } from '../../../properties'

type CompanyPageProps = {
	setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

function Companies({ setIsLoggedIn }: CompanyPageProps) {
	const [companies, setCompanies] = useState<CompanyData[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [errorMessage, setErrorMessage] = useState('')

	useEffect(() => {
		
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

		loadCompanies()

	}, [1])

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
						

						<button
							type="button"
							onClick={() => setIsLoggedIn(false)}
							className="inline-flex h-fit items-center justify-center rounded-2xl bg-slate-900 px-5 py-3 text-base font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-300"
						>
							Logout
						</button>
					</div>

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
