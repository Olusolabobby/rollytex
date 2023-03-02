import "./OrdersLists.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Datatable from "../../components/datatable/Datatable"
import ProductDatatable from "../../components/Product/ProductDatatable";
import Orders from "../Orders/Orders";

const OrdersLists = () => {
    return (
        <div className="list">
            <Sidebar/>
            <div className="listContainer">
                <Navbar/>
                <Orders/>
            </div>
        </div>
    )
}

export default OrdersLists