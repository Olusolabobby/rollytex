import "./ViewProductsSingle.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import React, { useContext, useEffect, useState, useRef } from "react";
import { db } from "../../firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";

const ViewProductsSingle = () => {
  const [product, setProduct] = useState();
  const navigate = useNavigate();
  const { productId } = useParams();

  console.log('product', productId, product);
  const productIDToShow = useContext(AuthContext).productIdToShow;

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const collectionRef = await collection(db, "products");
  //       onSnapshot(collectionRef, (snapshot) => {
  //         const data = snapshot.docs.map((doc) => ({
  //           ...doc.data(),
  //           id: doc.id,
  //         }));
  //         setProduct(
  //           data?.filter((product) => product?.id === productIDToShow)[0]
  //         );
  //         // console.log(
  //         //   data?.filter((product) => product?.id === productIDToShow)[0]
  //         // );
  //       });
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   fetchData();
  // }, []);

  useEffect(()=>{
    productId && onSnapshot(
      collection(db, "products"),
      (snapShot) => {
        snapShot.docs.forEach((doc) => {
          const product = {...doc.data(), id: doc.id}
          product?.id === productId && setProduct({
            id: doc.id, ...product
          })
        });
      }, (error) => {
        console.log (error);
      });
  },[productId])


  const handleClose = () => {
    navigate(-1);
  };

  // console.log('user',user);
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <h1 className="title">Information</h1>
            {/*{console.log(product)}*/}

            {/*Todo move to new Component*/}
            {/*{product && <ProductInfo product={product} />}*/}
            {/*Todo move to new Component*/}

            {product && (
              <div className="item" key={product.id}>
                <img
                  src={product?.img ? product?.img : "AVATAR"}
                  alt=""
                  className="itemImg"
                />
                <div className="details">
                  <h1 className="itemTitle">
                    {product.title.charAt(0).toUpperCase() +
                      product.title.slice(1).toLowerCase()}
                  </h1>
                  <div className="detailItem">
                    <span className="itemKey">Price:</span>
                    <span className="itemValue">{product.price}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Category:</span>
                    <span className="itemValue">{product.category}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Status:</span>
                    <span className="itemValue">{product.status}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Description:</span>
                    <span className="itemValue">{product.description}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Stock:</span>
                    <span className="itemValue">{product.stock}</span>
                  </div>
                </div>
              </div>
            )}
            <button onClick={handleClose}>Close</button>
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
