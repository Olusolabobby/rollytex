import "./ProductDatatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { productColumns, userRows } from "../../ProductDatatablesource";
import { Link } from "react-router-dom";
import { useState, useEffect, useReducer, useContext } from "react";
import { collection, getDocs, onSnapshot, doc, deleteDoc } from "firebase/firestore";
import {db} from "../../firebase";
import AuthReducer from '../../context/AuthReducer.js';
import { AuthContext } from '../../context/AuthContext.js';



const ProductsDatatable = () =>{
    const [data, setData] = useState([]);
    const {dispatch} = useContext(AuthContext)
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
            collection(db, "products"),
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
            await deleteDoc(doc(db, "products", id));
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
                        <Link to={`/products/${params.row.id}`} style={{ textDecoration: "none" }}
                              onClick={()=>{dispatch({type: "PRODUCT", payload:params.row.id})}}
                        >

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
                New Products
                <Link to="/products/new" className="link">
                    Add New
                </Link>
            </div>
            <DataGrid
                className="datagrid"
                rows={data}
                columns={productColumns.concat(actionColumn)}
                pageSize={9}
                rowsPerPageOptions={[9]}
                checkboxSelection
            />
        </div>
    );
};

export default ProductsDatatable;
