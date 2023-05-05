import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import NewProducts from "./pages/newProducts/NewProducts";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import {AuthContext} from "./context/AuthContext";
import ProductLists from "./pages/ProductsLists/ProductLists";
import ProfileLists from "./pages/ProfileLists/ProfileLists";
import OrdersLists from "./pages/OrdersLists/OrdersLists";
import DeliveryLists from "./pages/DeliveryLists/DeliveryLists";
import New from "./pages/new/New";
import ViewProductsSingle from "./pages/viewProductsSingle/ViewProductsSingle";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  const {currentUser} = useContext(AuthContext);

  const RequireAuth = ({ children }) => {
    return currentUser ? children : < Navigate to="/login" />;
  };

  // console.log(currentUser);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
            <Route index element={ <RequireAuth> <Home /> </RequireAuth>} />

            <Route path="/users">
              <Route index element={<RequireAuth> <List /> </RequireAuth>} />
              {/*<Route path=":userId" element={<RequireAuth> <Single /> </RequireAuth>} />*/}
              {/*<Route*/}
              {/*  path="new"*/}
              {/*  element={<RequireAuth> <New inputs={userInputs} title="Add New User" /> </RequireAuth>} />*/}
            </Route>
            <Route path="/users/:userId" element={<RequireAuth> <Single /> </RequireAuth>} />
            <Route
              path="/users/new"
              element={<RequireAuth> <New inputs={userInputs} title="Add New User" /> </RequireAuth>} />
            <Route path="profile" element={<RequireAuth> <ProfileLists/> </RequireAuth>} />
            <Route path="orders" element={<RequireAuth> <OrdersLists/> </RequireAuth>} />
            <Route path="delivery" element={<RequireAuth> <DeliveryLists/> </RequireAuth>} />

            {/*<Route path="/products">*/}
            {/*  <Route index element={<RequireAuth> <ProductLists /> </RequireAuth>} />*/}
            {/*  <Route path=":productId" element={<RequireAuth> < ViewProductsSingle /> </RequireAuth>} />*/}
            {/*  <Route*/}
            {/*    path="new"*/}
            {/*    element={ <RequireAuth> <NewProducts inputs={productInputs} title="Add New Products" /> </RequireAuth>}*/}
            {/*  />*/}
            {/*</Route>*/}
            <Route path="/products">
              <Route index element={<RequireAuth> <ProductLists /> </RequireAuth>} />
            </Route>
            <Route path="/products/:bobby" element={<RequireAuth> < ViewProductsSingle /> </RequireAuth>} />
            <Route
              path="/products/new"
              element={ <RequireAuth> <NewProducts inputs={productInputs} title="Add New Products" /> </RequireAuth>}
            />


          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
