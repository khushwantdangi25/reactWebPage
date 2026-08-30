import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./pages/Home";
import { Contect } from "./pages/Contect";
import { About } from "./pages/About";
import { Country } from "./pages/Country";
import { AppLayout } from "./components/AppLayout";
import { Error } from "./pages/Error";
const router = createBrowserRouter([
    {
        path:"/",
        element:<AppLayout/>,
        errorElement : <Error/>,
        children : [
            {
                path: "/",
                element : <Home/>,
            },
            {
                path : "contect",
                element : <Contect />,
            },
            {
                path : "about",
                element : <About />,
            },
            {
                path: "country",
                element: <Country />,
            },
        ],
    },
   
])
export const App = () =>{
    return  <RouterProvider router={router}></RouterProvider>
};
export default App;