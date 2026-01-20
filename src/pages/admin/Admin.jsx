import React from "react";
import { Link, Outlet } from "react-router-dom";

const Admin = () => {
  return (
    <div className="grid grid-cols-[100px_1fr] md:grid-cols-[200px_1fr]">
      {/* sidebar */}
        <ul className="flex flex-col ml-5 items-center gap-4 bg-gray-200 h-screen ">
          <Link to={"/admin/users"}>
            <li className="bg-white px-5 py-1 rounded mt-20">Users</li>
          </Link>
          <Link to={"/admin/products"}>
            <li className="bg-white px-5 py-1 rounded">Products</li>
          </Link>
          <Link to={"/admin/discounts"}>
            <li className="bg-white px-5 py-1 rounded">Discounts</li>
          </Link>
          <Link to={"/admin/orders"}>
            <li className="bg-white px-5 py-1 rounded">Orders</li>
          </Link>
        </ul>
      {/* sidebar */}
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Admin;
