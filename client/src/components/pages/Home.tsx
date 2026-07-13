type HomePageStateProps = {
    isLoggedIn: boolean;
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}
function Home({ isLoggedIn, setIsLoggedIn }: HomePageStateProps){

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold text-gray-800">Welcome to the Home Page!</h1>
            <p className="mt-4 text-base text-gray-600">
                Status: {isLoggedIn ? 'Logged in' : 'Logged out'}
            </p>
            <button
                type="button"
                onClick={() => setIsLoggedIn(false)}
                className="mt-8 rounded-2xl bg-slate-900 px-6 py-3 text-base font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-300"
            >
                Logout
            </button>
        </div>
        
    )
}

export default Home