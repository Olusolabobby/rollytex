import "./OrdersDatatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { OrderColumns, userRows } from "../../OrderDatatablesource";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { collection, getDocs, onSnapshot, doc, deleteDoc } from "firebase/firestore";
import {db} from "../../firebase";



const OrdersDatatable = () =>{
    const [data, setData] = useState([]);

    useEffect( ()=> {
        // const fetchData = async () => {
        //     let list = [];
        //     try{
        //         const querySnapshot = await getDocs(collection(db, "users"));
        //         querySnapshot.forEach((doc) => {
        //            list.push({id: doc.id, ...doc.data()});
        //         });
        //         setData(list);
        //         // console.log(list);
        //     }catch(err){
        //         console.log(err);
        //     }
        // };
        // fetchData();
        //LISTEN (REALTIME)
        const unsub = onSnapshot(
            collection(db, "orders"),
            (snapShot) => {
                let list = [];
                snapShot.docs.forEach((doc) => {
                    list.push({ id: doc.id, ...doc.data() });
                });
                setData(list)
            }, (error) => {
                console.log (error);
            });

        return () => {
            unsub();
        }
    }, []);

    // console.log(data);

    const handleProductDelete = async(id) => {
        try{
            await deleteDoc(doc(db, "orders", id));
            setData(data.filter((item) => item.id !== id));
        } catch (err) {
            console.log(err);
        }
    };

    const actionColumn = [
        {
            field: "action",
            headerName: "Action",
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="cellAction">
                        <Link to="/users/test" style={{ textDecoration: "none" }}>
                            <div className="viewButton">View</div>
                        </Link>
                        <div
                            className="deleteButton"
                            onClick={() => handleProductDelete(params.row.id)}
                        >
                            Delete
                        </div>
                    </div>
                );
            },
        },
    ];
    return (
        <div className="datatable">
            <div className="datatableTitle">
                Orders
                {/*<Link to="/users/new" className="link">*/}
                {/*    Add NewProducts*/}
                {/*</Link>*/}
            </div>
            <DataGrid
                className="datagrid"
                rows={data}
                columns={OrderColumns.concat(actionColumn)}
                pageSize={9}
                rowsPerPageOptions={[9]}
                checkboxSelection
            />
        </div>
    );
};

export default OrdersDatatable;
