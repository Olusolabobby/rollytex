import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import { Link } from "react-router-dom";
import {useState, useEffect, useContext} from "react";
import { collection, getDocs, onSnapshot, doc, deleteDoc } from "firebase/firestore";
import {db} from "../../firebase";
import {AuthContext} from "../../context/AuthContext";



const Datatable = () => {
    const [data, setData] = useState([]);
    const {dispatch} = useContext(AuthContext)


    const authUser = JSON.parse(localStorage.getItem ('user'))?.userInfo
    // const users = JSON.parse(localStorage.getItem ('users'))
    // console.log(authUser);

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
            collection(db, "users"),
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

    const handleDelete = async(id) => {
        try{
            await deleteDoc(doc(db, "users", id));
            setData(data.filter((item) => item.id !== id));
        } catch (err) {
            console.log(err);
        }
    };
    
    // export const HandleUserClick = () => {
    //     setShowInfo(true);
    //     setUserToShow(user);
    // }


    const actionColumn = [
        {
            field: "action",
            headerName: "Action",
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="cellAction">
                        {/*{console.log(params, 'params')}*/}
                        <Link to="/users/test" style={{ textDecoration: "none" }} onClick={()=>dispatch({type: "SHOW", payload:params.row.id})}>
                            <div className="viewButton" >View</div>
                        </Link>
                        <div
                            className="deleteButton"
                            onClick={() => handleDelete(params.row.id)}
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
                Add New User
                <Link to="/users/new" className="link">
                    Add New
                </Link>
            </div>
            <DataGrid
                className="datagrid"
                rows={data}
                columns={userColumns.concat(actionColumn)}
                pageSize={9}
                rowsPerPageOptions={[9]}
                checkboxSelection
            />
        </div>
    );
};

export default Datatable;
