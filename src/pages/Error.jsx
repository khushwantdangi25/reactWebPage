import { Navigate } from "react-router-dom"

export const Error = () => {
  return <>
    <h1>Error</h1>
    <Navigate to="/">Home</Navigate>
  </>


}