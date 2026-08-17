import { useRouteError } from "react-router-dom"

export const Error = () =>{
    const error = useRouteError();

    return <div>
        <h1>Oops! An error Occurred</h1>
        <h2>{error.data}</h2>
    </div>
}