import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import NavBar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Profile from "./pages/Profile";
import PrivateRoute from "./components/PrivateRoute";
import Admin from "./pages/admin/Admin";
import AdminProducts from "./pages/admin/adminProduct/AdminProducts";
import AdminUsers from "./pages/admin/adminUser/AdminUsers";
import UpdateUser from "./pages/admin/adminUser/UpdateUser";
import CreateProduct from "./pages/admin/adminProduct/CreateProduct";
import UpdateProduct from "./pages/admin/adminProduct/UpdateProduct";
import AdminDiscounts from "./pages/admin/adminDiscounts/AdminDiscounts";
import CreateDiscount from "./pages/admin/adminDiscounts/CreateDiscount";
import UpdateDiscount from "./pages/admin/adminDiscounts/UpdateDiscount";
import AdminOrders from "./pages/admin/adminOrders/AdminOrders";
import SingleOrder from "./pages/admin/adminOrders/SingleOrder";
import UpdateOrder from "./pages/admin/adminOrders/UpdateOrder";
import AdminRoute from "./components/AdminRoute";

const App = () => {
  return (
    <div className="my-5 mx-5">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <Admin />
            </AdminRoute>
          }
        >
          <Route path="users" element={<AdminUsers />} />
          <Route path="update-user/:id" element={<UpdateUser />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="create-product" element={<CreateProduct />} />
          <Route path="update-product/:id" element={<UpdateProduct />} />
          <Route path="discounts" element={<AdminDiscounts />} />
          <Route path="create-discount" element={<CreateDiscount />} />
          <Route path="update-discount/:id" element={<UpdateDiscount />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="view-order/:id" element={<SingleOrder />} />
          <Route path="update-order/:id" element={<UpdateOrder />} />
        </Route>
        <Route
          path="/checkout"
          element={
            <PrivateRoute>
              <Checkout />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
