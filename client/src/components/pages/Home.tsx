import Companies from '../company/Companies'

type HomePageStateProps = {
    isLoggedIn: boolean;
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

function Home({ isLoggedIn, setIsLoggedIn }: HomePageStateProps) {
    return (
        <Companies setIsLoggedIn={setIsLoggedIn} />
    )
}

export default Home