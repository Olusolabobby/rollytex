import "./ProfileLists.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Datatable from "../../components/datatable/Datatable"
import ProductDatatable from "../../components/Product/ProductDatatable";
import Profile from "../profile/Profile";

const ProfileLists = () => {
    return (
        <div className="list">
            <Sidebar/>
            <div className="listContainer">
                <Navbar/>
                <Profile/>
            </div>
        </div>
    )
}

export default ProfileLists