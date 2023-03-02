import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import React, {useContext, useEffect, useState} from "react";
import {db} from "../../firebase";
import {collection, setDoc, doc, onSnapshot} from "firebase/firestore";
import {AuthContext} from "../../context/AuthContext";
import {setFormData} from "../../jsHelpers/js-Helpers";

const Single = () => {

  const [user, setUser] = useState([]);
  const [editId, setEditId] = useState('');
  const [editFormValues, setEditFormValues] = useState({});


  const userIDToShow = useContext(AuthContext).currentUser.idToShow;
  // console.log('userIDToShow',userIDToShow)

  // const authUser = JSON.parse(localStorage.getItem ('user'))?.userInfo;
  // console.log(authUser)


  useEffect ( ()=> {
    const fetchData = async () => {
      try{
        const collectionRef = await collection(db, "users");
        onSnapshot(collectionRef, (snapshot) => {
          const data = snapshot.docs.map((doc) => ({...doc.data(), id: doc.id}))
          setUser(data?.filter(user => user?.id === userIDToShow))
          // console.log(list);
        });
      }catch(err){
        console.log(err);
      }
    };
    fetchData();
  }, [])

  const editUser = async(id, newUser = editFormValues) => {
    const docRef = doc(db,"users",id);
    console.log('docRef', docRef);
    // console.log('editFormValues', newUser);
    await setDoc(docRef, newUser)
  }

  const handleSaveEdit = async (id, newUser) => {
    await editUser(id, newUser);
    setEditId('');
    setEditFormValues({});
  }

  return (
      <div className="single">
        <Sidebar />
        <div className="singleContainer">
          <Navbar />
          <div className="top">
            <div className="left">
              <div className="editButton" onClick={ ()=> console.log(setEditId(user?.id))}>Edit</div>
              <h1 className="title" >Information</h1>


              {user && user.map((user) => (
                  editId !== user?.id
                  ? (<div className="item" key={user.id}>
                    {user?.img && <img
                        src={user.img}
                        alt=""
                        className="itemImg"
                    />}
                    <div className="details">
                      <h1 className="itemTitle">{user.displayName}</h1>
                      <div className="detailItem">
                        <span className="itemKey">Email:</span>
                        <span className="itemValue">{user.email}</span>
                      </div>
                      <div className="detailItem">
                        <span className="itemKey">Phone:</span>
                        <span className="itemValue">{user.phone}</span>
                      </div>
                      <div className="detailItem">
                        <span className="itemKey">Address:</span>
                        <span className="itemValue">
                        {user.address}
                      </span>
                      </div>
                      <div className="detailItem">
                        <span className="itemKey">Country:</span>
                        <span className="itemValue">{user.country}</span>
                      </div>
                    </div>
                  </div>)
                      :
                      (<div>
                        <div className="detailItem">
                          <span className="itemKey">FullName</span>
                          <input value={ editFormValues?.displayName}
                          onChange={ (e)=> setFormData(e.target.value, 'displayName',setEditFormValues)}
                          />
                        </div>


                        {/*<button type='button' onClick={()=>handleSaveEdit(user.id)}>Save Edit</button>*/}

                      </div>)
              )) }


            </div>
            <div className="right">
              <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
            </div>
          </div>
          <div className="bottom">
            <h1 className="title">Last Transactions</h1>
            <List/>
          </div>
        </div>
      </div>
  );
};

export default Single;
