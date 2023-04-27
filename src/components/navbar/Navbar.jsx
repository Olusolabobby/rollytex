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
import { Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { dispatch } = useContext(DarkModeContext);

  const [user, setUser] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchInput, setSearchInput] = useState( '');
  const [users, setUsers] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const navigate = useNavigate();



  const authUser = JSON.parse(localStorage.getItem('user'));
  // console.log(authUser);

  useEffect ( ()=> {
    const fetchData = async () => {
      try{
        const collectionRef = await collection(db, "users");
        onSnapshot(collectionRef, (snapshot) => {
          const data = snapshot.docs.map((doc) => ({...doc.data(), id: doc.id}));
          setUser(data.filter(user => user.id === authUser.uid)[0]);
          setUsers(data);
          // console.log(list);
        })

        onSnapshot(
          collection(db, "products"),
          (snapShot) => {
            let list = [];
            snapShot.docs.forEach((doc) => {
              list.push({ id: doc.id, ...doc.data() });
            });
            setProducts(list)
          }, (error) => {
            console.log (error);
          });


      }catch(err){
        console.log(err);
      }
    };
    fetchData();
  }, [])

  useEffect(() => {
    const timer = setTimeout( ()=>{
      searchInput !== '' && searchUsers()
    }, 500)
    return () => clearTimeout(timer)
  }, [searchInput]);


  const searchUsers = (value) => {
    console.log('searching');
    console.log('users', users, products);
    const filteredUsers = users.filter(items =>
        (items?.displayName.toLowerCase().includes(searchInput.toLowerCase())
        || items?.email.toLowerCase().includes(searchInput.toLowerCase())));
        // console.log('filteredUsers', filteredUsers);
    const filteredProducts = products.filter(items =>
      items?.title?.toLowerCase().includes(searchInput.toLowerCase()));
      // (items?.description?.toLowerCase().includes(searchInput.toLowerCase())
      //   || items?.title?.toLowerCase().includes(searchInput.toLowerCase())));
    // console.log('filteredUsers', filteredUsers);
    console.log([...filteredUsers, ...filteredProducts])
        setSearchResults([...filteredUsers, ...filteredProducts])
  }


console.log('searchInput', searchInput)

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="searchBlock">
          <div className="search">
            <input
                type="text"
                placeholder="Search..."
                value={searchInput}
                onChange={(e)=>setSearchInput(e.target.value)} />
            <SearchOutlinedIcon />
          </div>

          {searchResults?.length > 0 && <div className="searchResults">
            <div className="searchBox" >
              {searchResults.map(result =>
                  <p onClick={()=> {
                    navigate(result?.username ?  ('/users/' + result.username) : ('/products/' + result?.title))
                  }}>
                  <img className="searchImage" src={result.img}/> {result?.displayName || result?.title}
                  </p>
)}

            </div>
          </div>}
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
