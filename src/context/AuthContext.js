import {createContext, useEffect, useReducer} from "react";
import AuthReducer from "./AuthReducer";
import {collection, onSnapshot} from "firebase/firestore";
import {db} from "../firebase";

const INITIAL_STATE = {
    currentUser: JSON.parse(localStorage.getItem("user")) || null,
};

export const AuthContext = createContext(INITIAL_STATE);
// export const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    useEffect( ()=>{
        // console.log('state.currentUser', state.currentUser);
        if(state?.currentUser?.uid){
            const collectionRef = collection(db, "users");
            onSnapshot(collectionRef, (snapshot) => {
                const data = snapshot.docs.map((doc) => ({...doc.data(), id: doc.id}))
                // console.log('state?.currentUser?.uid', state?.currentUser?.uid)
                const authUser = data?.filter((user)=> user?.id === state?.currentUser?.uid)
                // console.log(authUser,data)
                localStorage.setItem("user", JSON.stringify({...state?.currentUser,
                    userInfo : authUser?.[0]}))
                && authUser?.[0]
                && dispatch({type: "LOGIN", payload:{...state.currentUser,
                        userInfo : authUser?.[0]}});
            });
            }

    }, [state.currentUser])

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};
