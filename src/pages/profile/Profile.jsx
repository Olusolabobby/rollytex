import React, {useEffect, useState} from "react";
import "./Profile.scss"
import {collection, onSnapshot} from "firebase/firestore";
import {db} from "../../firebase";

const Profile = ()=> {

    const [user, setUser] = useState([]);

    const authUser = JSON.parse(localStorage.getItem('user')).userInfo;
    // console.log(authUser);

    useEffect ( ()=> {
        const fetchData = async () => {
            try{
                const collectionRef = await collection(db, "users");
                onSnapshot(collectionRef, (snapshot) => {
                    const data = snapshot.docs.map((doc) => ({...doc.data(), id: doc.id}))
                    setUser(data.filter(user => user.id === authUser.uid)[0])
                    // console.log(list);
                })
            }catch(err){
                console.log(err);
            }
        };
        fetchData();
    }, [])

    return(
        <div className="profile">
            <div className="profileItems">
                <h1>Profile</h1>

                {authUser?.id &&
                    <div>
                        <div className="imgItem"><img src={authUser.img} alt="" />
                        </div>

                      <div>
                        <span className="itemKey">Full name: </span>
                        <span className="itemValue">{authUser.displayName}</span>
                      </div>

                      <div>
                        <span className="itemKey">Username: </span>
                        <span className="itemValue">{authUser.username}</span>
                      </div>

                       <div>
                        <span className="itemKey">Email: </span>
                        <span className="itemValue">{authUser.email}</span>
                         </div>
                        <div>
                        <span className="itemKey">Phone number: </span>
                        <span className="itemValue">{authUser.phone}</span>
                        </div>
                        <div>
                        <span className="itemKey">Address: </span>
                        <span className="itemValue">{authUser.address}</span>
                         </div>
                        <div>
                        <span className="itemKey">Country: </span>
                        <span className="itemValue">{authUser.country}</span>
                        </div>
                    </div>
                }

            </div>
        </div>
    );
};
export default Profile;