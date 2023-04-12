import React, {useEffect, useState} from "react";
import "./Profile.scss"
import {collection, doc, onSnapshot, setDoc} from "firebase/firestore";
import {db, storage} from "../../firebase";
import {setFormData} from "../../jsHelpers/js-Helpers";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";

const Profile = ()=> {

    const [user, setUser] = useState([]);
    const [editId, setEditId] = useState('');
    const [file, setFile] = useState('');
    const [editFormValues, setEditFormValues] = useState({});
    const [perc, setPerc] = useState (null); // to allow the image show in the users collection in firebase


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
    }, []);



    useEffect ( ()=>{

        const handleUpload = () => {
            const name = new Date().getTime() + file.name
            // console.log(name);
            const storageRef = ref(storage, file.name);
            const uploadTask = uploadBytesResumable(storageRef, file)

            uploadTask.on("state_changed",
                (snapshot)=> {
                    const progress = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                    console.log(progress, "%");
                    setPerc (progress)
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                        default:
                            break;
                    }
                },
                (err)=> console.log(err),
                ()=>{
                    getDownloadURL(uploadTask.snapshot.ref)
                        // .then(url => console.log(url))
                        .then(url => setEditFormValues(prevState => {
                            return{
                                ...prevState,
                                img: url,
                                imageName: file.name
                            }
                        }));
                }
            );
        };
        file && handleUpload();
    }, [file]);


    const editUser = async(id, newUser = editFormValues) => {
        const docRef = doc(db, "users", id);
        // console.log('docRef', docRef);
        // console.log('editFormValues', newUser);
        await setDoc(docRef, newUser);
    }

    const handleSaveEdit = async(id, newUser) => {
        await editUser (id, editFormValues);
        setEditId('');
        setEditFormValues({});
    }

    // console.log('authuser',authUser);

    return(
        <div className="profile">
            <div className="profileItems">
                <h1>Information</h1>

                {authUser?.id &&
                     editId !== authUser?.id
                     ?
                    (<div className="container" key={authUser.id}>
                        <div className="left">
                            <div className="imgItem"><img src={authUser.img} alt="" /></div>
                        </div>


                        <div className="right">
                            <div>
                                <span className="itemKey">Full name: </span>
                                <span className="itemValue">{authUser.displayName.charAt(0).toUpperCase() + authUser.displayName.slice(1).toLowerCase()}</span>
                            </div>

                            <div>
                                <span className="itemKey">Username: </span>
                                <span className="itemValue">{authUser.username}</span>
                            </div>

                            <div>
                                <span className="itemKey">Role: </span>
                                <span className="itemValue">{authUser.role}</span>
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
                            <button type="button" onClick={ ()=> {
                                setEditId(authUser.id);
                                setEditFormValues(authUser)}}>Edit</button>
                        </div>

                    </div>)

                    :

                    (<div className="editDetail" key={authUser.id}>

                        <div>
                            <img style={{width: "100px"}}
                                 src={
                                     file
                                         ? URL.createObjectURL(file)
                                         : editFormValues.img
                                 }
                                 alt=""
                            />
                        </div>

                        <label htmlFor="file" style={{display: "flex", justifyContent:"flex-start"}} className="file">
                            Image: <DriveFolderUploadOutlinedIcon className="icon" />
                        </label>
                        <input
                            type="file" id="file"
                            onChange={(e) => setFile(e.target.files[0])}
                            style={{ display: "none" }}
                        />

                        <div>
                            <span className="itemKeyEdit displayname">FullName: </span>
                            <input  placeholder={editFormValues.displayName}
                                   onChange={(e)=>
                                       setFormData(e.target.value, 'displayName', setEditFormValues)}
                            />
                        </div>

                        <div>
                            <span className="itemKeyEdit username">Username: </span>
                            <input placeholder={editFormValues.username}
                                   onChange={(e)=>
                                       setFormData(e.target.value, 'username', setEditFormValues)}
                            />
                        </div>

                        <div>
                            <span className="itemKeyEdit phone">Phone: </span>
                            <input placeholder={editFormValues.phone}
                                   onChange={(e)=>
                                       setFormData(e.target.value, 'phone', setEditFormValues)}
                            />
                        </div>

                        <div>
                            <span className="itemKeyEdit address">Address: </span>
                            <input placeholder={editFormValues.address}
                                   onChange={(e)=>
                                       setFormData(e.target.value, 'address', setEditFormValues)}
                            />
                        </div>

                        <div>
                            <span className="itemKeyEdit country">Country: </span>
                            <input placeholder={editFormValues.country}
                                   onChange={(e)=>
                                       setFormData(e.target.value, 'country', setEditFormValues)}
                            />
                        </div>

                        <button  disabled={perc !== null && perc < 100 } type="button" onClick={()=>handleSaveEdit(authUser.id)}>Save</button>

                    </div>)

                }

            </div>
        </div>
    );
};
export default Profile;