import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import React, {useEffect, useState} from "react";
import {db} from "../../firebase";
import {collection, getDocs, onSnapshot} from "firebase/firestore";

const Single = () => {

  const [users, setUsers] = useState([]);

  useEffect ( ()=> {
    const fetchData = async () => {
        try{
            const collectionRef = await collection(db, "users");
            onSnapshot(collectionRef, (snapshot) => {
                const data = snapshot.docs.map((doc) => ({...doc.data(), id: doc.id}))
                setUsers(data)
            // console.log(list);
        })
        }catch(err){
            console.log(err);
        }
    };
      fetchData();
  }, [])


  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton">Edit</div>
            <h1 className="title">Information</h1>

              {users && users.map((user) => (

                <div className="item" key={user.id}>
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
                </div>
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
