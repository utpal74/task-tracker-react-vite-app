
import Header from "./Header";
import Footer from "./Footer";

export default function HomePage() {
    return (
        <>
            <div className='container'>
                <Header />
                <section>
                    <p>Welcome to track my tak app - you can now track your task status from anywhere and pickup where you left off.</p>
                    <p>Give it a try -
                        <button
                            className='add-task'
                            onClick={() => { console.log('Task added') }}
                        >
                            Add task
                        </button>
                    </p>
                </section>
                <Footer />
            </div>
        </>
    )
}