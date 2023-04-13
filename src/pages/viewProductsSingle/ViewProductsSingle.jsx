import "./ViewProductsSingle.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import React, { useContext, useEffect, useState, useRef } from "react";
import { db, storage } from "../../firebase";
import { collection, setDoc, doc, onSnapshot } from "firebase/firestore";
import { AuthContext } from "../../context/AuthContext";
import { setFormData } from "../../jsHelpers/js-Helpers";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import App from "../../App";

const ViewProductsSingle = () => {
  const [product, setProduct] = useState();
  const [file, setFile] = useState("");
  const [editId, setEditId] = useState("");
  const [editFormValues, setEditFormValues] = useState({});
  const [perc, setPerc] = useState(null); // to allow the image show in the users collection in firebase

  // const productIDToShow = useContext(AuthContext).currentProduct.newIdToShow;
  const productIDToShow = useContext(AuthContext).productIdToShow

  useEffect(() => {
    const fetchData = async () => {
      try {
        const collectionRef = await collection(db, "products");
        onSnapshot(collectionRef, (snapshot) => {
          const data = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setProduct(
            data?.filter((product) => product?.id === productIDToShow)[0]
          );
          console.log( data?.filter((product) => product?.id === productIDToShow)[0]);
        });
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  // const editUser = async(id, newUser = editFormValues) => {
  //   const docRef = doc(db,"products", id);
  //   // console.log('docRef', docRef);
  //   // console.log('editFormValues', newUser);
  //   await setDoc(docRef, newUser);
  // }
  //
  // const handleSaveEdit = async (id, newUser) => {
  //   await editUser( id, editFormValues);
  //   setEditId('');
  //   setEditFormValues({});
  // }

  useEffect(() => {
    const handleUpload = () => {
      const name = new Date().getTime() + file.name;
      // console.log(name);
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(progress, "%");
          setPerc(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (err) => console.log(err),
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            // .then(url => console.log(url))
            .then((url) =>
              setEditFormValues((prevState) => {
                return {
                  ...prevState,
                  img: url,
                  imageName: file.name,
                };
              })
            );
        }
      );
    };
    file && handleUpload();
  }, [file]);

  // console.log('user',user);
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div
              className="editButton"
              // onClick={() => setEditId(user[0].id)}
            >
              Edit
            </div>
            <h1 className="title">Information</h1>
            {console.log(product)}

            {/*Todo move to new Component*/}
            {/*{product && <ProductInfo product={product} />}*/}
            {/*Todo move to new Component*/}


            {product &&
              <img src={product?.img ? product?.img : 'AVATAR'} alt="" className="itemImg" />
            }

            }
            {/*  product.map((product) =>*/}
            {/*    editId !== product?.id ? (*/}
            {/*      <div className="item" key={product.id}>*/}
            {/*        {product?.img && (*/}
            {/*          <img src={product.img} alt="" className="itemImg" />*/}
            {/*        )}*/}
            {/*        <div className="details">*/}
            {/*          <h1 className="itemTitle">*/}
            {/*            {user.displayName.charAt(0).toUpperCase() +*/}
            {/*              user.displayName.slice(1).toLowerCase()}*/}
            {/*          </h1>*/}
            {/*          <div className="detailItem">*/}
            {/*            <span className="itemKey">Username:</span>*/}
            {/*            <span className="itemValue">username</span>*/}
            {/*          </div>*/}
            {/*          <div className="detailItem">*/}
            {/*            <span className="itemKey">Email:</span>*/}
            {/*            <span className="itemValue">email</span>*/}
            {/*          </div>*/}
            {/*          <div className="detailItem">*/}
            {/*            <span className="itemKey">Phone:</span>*/}
            {/*            <span className="itemValue">phone</span>*/}
            {/*          </div>*/}
            {/*          <div className="detailItem">*/}
            {/*            <span className="itemKey">Address:</span>*/}
            {/*            <span className="itemValue">address</span>*/}
            {/*          </div>*/}
            {/*          <div className="detailItem">*/}
            {/*            <span className="itemKey">Country:</span>*/}
            {/*            <span className="itemValue">country</span>*/}
            {/*          </div>*/}
            {/*          <div*/}
            {/*            className="editButton"*/}
            {/*            // onClick={() => {*/}
            {/*            //   setEditId(user.id);*/}
            {/*            //   setEditFormValues(user);*/}
            {/*            // }}*/}
            {/*          >*/}
            {/*            Edit*/}
            {/*          </div>*/}
            {/*        </div>*/}
            {/*      </div>*/}
            {/*    ) : (*/}
            {/*      <div key={user.id}>*/}
            {/*        {editFormValues?.img && (*/}
            {/*          <img*/}
            {/*            src={editFormValues.img}*/}
            {/*            alt=" "*/}
            {/*            style={{ width: "100px" }}*/}
            {/*          />*/}
            {/*        )}*/}

            {/*        <div>*/}
            {/*          <img*/}
            {/*            style={{ width: "100px" }}*/}
            {/*            src={*/}
            {/*              file ? URL.createObjectURL(file) : editFormValues.img*/}
            {/*            }*/}
            {/*            alt=""*/}
            {/*          />*/}
            {/*        </div>*/}

            {/*        <label*/}
            {/*          htmlFor="file"*/}
            {/*          style={{ display: "flex", justifyContent: "flex-start" }}*/}
            {/*        >*/}
            {/*          Image: <DriveFolderUploadOutlinedIcon className="icon" />*/}
            {/*        </label>*/}
            {/*        <input*/}
            {/*          type="file"*/}
            {/*          id="file"*/}
            {/*          onChange={(e) => setFile(e.target.files[0])}*/}
            {/*          style={{ display: "none" }}*/}
            {/*        />*/}

            {/*        <div className="detailItem">*/}
            {/*          <span className="itemKeyEdit">FullName: </span>*/}
            {/*          <input*/}
            {/*            placeholder={editFormValues.displayName}*/}
            {/*            onChange={(e) =>*/}
            {/*              setFormData(*/}
            {/*                e.target.value,*/}
            {/*                "displayName",*/}
            {/*                setEditFormValues*/}
            {/*              )*/}
            {/*            }*/}
            {/*          />*/}
            {/*        </div>*/}
            {/*        <br />*/}
            {/*        <div className="detailItem">*/}
            {/*          <span className="itemKeyEdit username">Username: </span>*/}
            {/*          <input*/}
            {/*            placeholder={editFormValues.username}*/}
            {/*            onChange={(e) =>*/}
            {/*              setFormData(*/}
            {/*                e.target.value,*/}
            {/*                "username",*/}
            {/*                setEditFormValues*/}
            {/*              )*/}
            {/*            }*/}
            {/*          />*/}
            {/*        </div>*/}
            {/*        <br />*/}
            {/*        <div className="detailItem">*/}
            {/*          <span className="itemKeyEdit phone">Phone: </span>*/}
            {/*          <input*/}
            {/*            placeholder={editFormValues.phone}*/}
            {/*            onChange={(e) =>*/}
            {/*              setFormData(*/}
            {/*                e.target.value,*/}
            {/*                "phone",*/}
            {/*                setEditFormValues*/}
            {/*              )*/}
            {/*            }*/}
            {/*          />*/}
            {/*        </div>*/}
            {/*        <br />*/}
            {/*        <div className="detailItem">*/}
            {/*          <span className="itemKeyEdit address">Address: </span>*/}
            {/*          <input*/}
            {/*            placeholder={editFormValues.address}*/}
            {/*            onChange={(e) =>*/}
            {/*              setFormData(*/}
            {/*                e.target.value,*/}
            {/*                "address",*/}
            {/*                setEditFormValues*/}
            {/*              )*/}
            {/*            }*/}
            {/*          />*/}
            {/*        </div>*/}
            {/*        <br />*/}
            {/*        <div className="detailItem">*/}
            {/*          <span className="itemKeyEdit country">Country: </span>*/}
            {/*          <input*/}
            {/*            placeholder={editFormValues.country}*/}
            {/*            onChange={(e) =>*/}
            {/*              setFormData(*/}
            {/*                e.target.value,*/}
            {/*                "country",*/}
            {/*                setEditFormValues*/}
            {/*              )*/}
            {/*            }*/}
            {/*          />*/}
            {/*        </div>*/}
            {/*        <br />*/}
            {/*        <br />*/}
            {/*        <button*/}
            {/*          disabled={perc !== null && perc < 100}*/}
            {/*          type="button"*/}
            {/*          // onClick={() => handleSaveEdit(user.id)}*/}
            {/*        >*/}
            {/*          Save*/}
            {/*        </button>*/}
            {/*      </div>*/}
            {/*    )*/}
            {/*  )}*/}
          </div>
          <div className="right">
            <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
          </div>
        </div>
        <div className="bottom">
          <h1 className="title">Last Transactions</h1>
          <List />
        </div>
      </div>
    </div>
  );
};

export default ViewProductsSingle;
