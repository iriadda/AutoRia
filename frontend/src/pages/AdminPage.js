import AddBrandModelComponent from "../components/AddBrandModelComponent";
import AdVerification from "../components/ManagerModerationComponent";
import UserModeration from "../components/UserModeration";

const AdminPage = () => {
    return (
        <>
            <AddBrandModelComponent />
            <hr/>
            <UserModeration/>
            <hr/>
            <AdVerification/>
        </>
    );
};
export default AdminPage;