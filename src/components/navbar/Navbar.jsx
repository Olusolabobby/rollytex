import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import { DarkModeContext } from "../../context/darkModeContext";
import {useContext, useEffect, useState} from "react";
import {collection, doc, getDoc, onSnapshot} from "firebase/firestore";
import {db} from "../../firebase";

const Navbar = () => {
  const { dispatch } = useContext(DarkModeContext);

  const [user, setUser] = useState([]);



  const authUser = JSON.parse(localStorage.getItem('user'));
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



  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          <input type="text" placeholder="Search..." />
          <SearchOutlinedIcon />
        </div>
        <div className="items">
          <div className="item">
            <LanguageOutlinedIcon className="icon" />
            English
          </div>
          <div className="item">
            <DarkModeOutlinedIcon
              className="icon"
              onClick={() => dispatch({ type: "TOGGLE" })}
            />
          </div>
          <div className="item">
            <FullscreenExitOutlinedIcon className="icon" />
          </div>
          <div className="item">
            <NotificationsNoneOutlinedIcon className="icon" />
            <div className="counter">1</div>
          </div>
          <div className="item">
            <ChatBubbleOutlineOutlinedIcon className="icon" />
            <div className="counter">2</div>
          </div>
          <div className="item">
            <ListOutlinedIcon className="icon" />
          </div>

          {user?.id &&
          <div className="item" key={user.id}>
            {user?.img ? <img
              src={user.img}
              alt=""
              className="avatar"
            /> : <div>{user?.displayName?.slice(0, 2).toUpperCase()}</div>}
          </div>
          }

        </div>
      </div>
    </div>
  );
};

export default Navbar;
