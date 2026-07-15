function Login() {
    return (
        <main className="min-h-screen bg-[radial-gradient(circle_at_top,_#fef3c7,_#fff7ed_40%,_#ffffff_75%)] px-6 py-12 text-slate-900">
            <div className="mx-auto flex min-h-[calc(100vh-6rem)] w-full max-w-6xl items-center justify-center">
                <section className="grid w-full overflow-hidden rounded-[2rem] border border-white/70 bg-white/80 shadow-[0_30px_80px_rgba(148,63,16,0.12)] backdrop-blur md:grid-cols-[1.05fr_0.95fr]">
                    <div className="flex flex-col justify-between bg-slate-900 px-8 py-10 text-white sm:px-10 lg:px-12 lg:py-12">
                        <div className="space-y-6">
                            <span className="inline-flex w-fit rounded-full border border-amber-300/30 bg-amber-300/10 px-4 py-1 text-sm font-medium tracking-[0.2em] text-amber-200 uppercase">
                                JobSeek
                            </span>
                            <div className="space-y-4">
                                <h1 className="max-w-md text-4xl font-semibold tracking-tight sm:text-5xl">
                                    Welcome back to your next opportunity.
                                </h1>
                                <p className="max-w-lg text-base leading-7 text-slate-300 sm:text-lg">
                                    Sign in to track applications, save shortlisted roles, and stay on top of recruiter updates.
                                </p>
                            </div>
                        </div>

                        <div className="mt-10 grid gap-4 text-sm text-slate-300 sm:grid-cols-3">
                            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                                <p className="text-2xl font-semibold text-white">2.4k</p>
                                <p className="mt-1">Open roles curated this week</p>
                            </div>
                            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                                <p className="text-2xl font-semibold text-white">87%</p>
                                <p className="mt-1">Applicants return within 3 days</p>
                            </div>
                            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                                <p className="text-2xl font-semibold text-white">18m</p>
                                <p className="mt-1">Average time to shortlist</p>
                            </div>
                        </div>
                    </div>

                    <div className="px-8 py-10 sm:px-10 lg:px-12 lg:py-12">
                        <div className="mx-auto w-full max-w-md">
                            <div className="space-y-2">
                                <p className="text-sm font-medium uppercase tracking-[0.25em] text-amber-600">
                                    Account access
                                </p>
                                <h2 className="text-3xl font-semibold tracking-tight text-slate-900">
                                    Sign in
                                </h2>
                                <p className="text-sm leading-6 text-slate-500">
                                    Enter your details below to continue managing your job search.
                                </p>
                            </div>

                            <form className="mt-8 space-y-5">
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium text-slate-700">
                                        Email address
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        placeholder="name@example.com"
                                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 outline-none transition focus:border-amber-500 focus:ring-4 focus:ring-amber-100"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center justify-between gap-4">
                                        <label htmlFor="password" className="text-sm font-medium text-slate-700">
                                            Password
                                        </label>
                                        <a href="#" className="text-sm font-medium text-amber-700 transition hover:text-amber-800">
                                            Forgot password?
                                        </a>
                                    </div>
                                    <input
                                        id="password"
                                        type="password"
                                        placeholder="Enter your password"
                                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 outline-none transition focus:border-amber-500 focus:ring-4 focus:ring-amber-100"
                                    />
                                </div>

                                <div className="flex items-center justify-between gap-4 text-sm text-slate-600">
                                    <label className="flex items-center gap-3">
                                        <input
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-slate-300 text-amber-600 focus:ring-amber-500"
                                        />
                                        <span>Remember me</span>
                                    </label>
                                    <span>Secure login</span>
                                </div>

                                <button 
                                    type="submit"
                                    className="w-full rounded-2xl bg-slate-900 px-4 py-3 text-base font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-200"
                                >
                                    Sign in to JobSeek
                                </button>
                            </form>

                            <div className="mt-8">
                                <div className="flex items-center gap-3 text-sm text-slate-400">
                                    <span className="h-px flex-1 bg-slate-200" />
                                    <span>New to JobSeek?</span>
                                    <span className="h-px flex-1 bg-slate-200" />
                                </div>
                                <button
                                    type="button"
                                    className="mt-5 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                                >
                                    Create an account
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    )
}

export default Login;