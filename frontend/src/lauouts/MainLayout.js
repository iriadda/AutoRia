import {Outlet} from "react-router-dom";
import {Menu} from "../components/menu";

const MainLayout = () => {

    return (
        <>
            <Menu/>
            <hr/>
            <Outlet/>
        </>
    );
};
export default MainLayout;