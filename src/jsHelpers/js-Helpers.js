import {auth} from "../firebase";
import {signOut} from "firebase/auth";


export const logOutUser = async(callback) => {
    try {
        const res = await signOut(auth)
        // console.log(res)
        localStorage.removeItem('user');
        callback('/login');

    } catch (e) {
        console.log(e);
    }
};

export const setFormData = (value, key, callback) => {
    callback((prevState)=>{
        return{
            ...prevState,
            [key]: value,
        }
    });
};