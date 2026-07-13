import Companies from '../company/Companies'

type HomePageStateProps = {
    isLoggedIn: boolean;
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

function Home({ isLoggedIn, setIsLoggedIn }: HomePageStateProps) {
    return (
        <main className="min-h-screen bg-[radial-gradient(circle_at_top,_#dbeafe,_#eff6ff_35%,_#f8fafc_75%)] px-6 py-10 text-slate-900">
            <Companies setIsLoggedIn={setIsLoggedIn} />
        </main>
    )
}

export default Home