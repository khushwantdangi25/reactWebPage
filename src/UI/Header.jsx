import { NavLink } from "react-router-dom"
import "./Header.css"
export const Header = () =>{
    return <header>
        <div className="container">
            <div className="logo">
                <NavLink to = "/">
                <h1>World</h1>
                </NavLink>
            </div>
            <nav>
                <ul>
                    <li><NavLink to = "/">Home</NavLink></li>
                    <li><NavLink to = "/about">About</NavLink></li>
                    <li><NavLink to = "/contect">Contect</NavLink></li>
                    <li><NavLink to = "/country">Country</NavLink></li>
                </ul>
            </nav>
        </div>
    </header>
}