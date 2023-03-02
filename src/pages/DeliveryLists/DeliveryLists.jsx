import "./DeliveryLists.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Datatable from "../../components/datatable/Datatable"
import ProductDatatable from "../../components/Product/ProductDatatable";
import Orders from "../Orders/Orders";
import Delivery from "../Delivery/Delivery";
import DeliveryDatatable from "../../components/Delivery/DeliveryDatatable";

const DeliveryLists = () => {
    return (
        <div className="list">
            <Sidebar/>
            <div className="listContainer">
                <Navbar/>
                <DeliveryDatatable />
            </div>
        </div>
    )
}

export default DeliveryLists