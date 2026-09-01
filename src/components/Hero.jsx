import { NavLink } from "react-router-dom"
import { About } from "../pages/About"
export const Hero = () => {
    return <main>
        <div className="hero">
            <div className="quote">
                <h1>
                    “The world is a book, <br />and those who do not <br /> travel
                    read only one page.”
                </h1>
                <p>They can inspire planning a new trip, embracing spontaneity,<br />
                    or simply appreciating the experiences gained from past journeys.</p>
                <NavLink to="/country" className="explore-btn">Explore</NavLink>
            </div>
            <div className="image">
                <img src="https://th.bing.com/th/id/OIP.bahcsh5zMhWFZtqvoVHnrwHaEK?r=0&pid=CanonicalCanvas"
                    alt="" />
            </div>
        </div>
        <About />
    </main>
}