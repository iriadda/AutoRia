import ReactDOM from 'react-dom/client';
import {RouterProvider} from "react-router-dom";
import {routers} from "./routers";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RouterProvider router={routers}/>
);
