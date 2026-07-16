
export function FormPopupTemplate({
    children , title , subtitle , errorMessage , onClose 
} : {
    children: React.ReactNode,
    title: string,
    subtitle?: string,
    errorMessage?: string,
    onClose: () => void
}){
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fadeIn">
			<div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-8 transform transition-all duration-300 ease-out animate-slideUp">
				{/* Header with Close Button */}
				<div className="flex items-center justify-between mb-6">
					<div>
						<h2 className="text-3xl font-bold text-slate-900">{title}</h2>
						{subtitle && <p className="text-slate-500 text-sm mt-1">{subtitle}</p>}
						{errorMessage && <p className="text-red-500 text-sm mt-1">{errorMessage}</p>}
					</div>
					<button
						type="button"
						onClick={onClose}
						className="text-slate-400 hover:text-slate-600 transition-colors duration-200 p-2 hover:bg-slate-100 rounded-lg"
						aria-label="Close form"
					>
						<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</div>

				{/* Divider */}
				<div className="border-t border-slate-200 mb-6"></div>

                {children}

            </div>

                {/* Animations */}
                <style>{`
                    @keyframes fadeIn {
                        from { opacity: 0; }
                        to { opacity: 1; }
                    }
                    @keyframes slideUp {
                        from {
                            opacity: 0;
                            transform: translateY(20px) scale(0.95);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0) scale(1);
                        }
                    }
                    .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
                    .animate-slideUp { animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
                `}</style>
           
        </div>
    )
}
