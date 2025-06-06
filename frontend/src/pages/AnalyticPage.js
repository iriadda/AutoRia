import AnalyticComponent from "../components/AnalyticComponent";
import {useParams} from "react-router-dom";

export const AnalyticPage = () => {
    const carId =useParams()

    return (
        <>
            <AnalyticComponent carId={carId}/>
        </>
    )
}
