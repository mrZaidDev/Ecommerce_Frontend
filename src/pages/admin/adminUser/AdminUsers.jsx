import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_API } from "../../../config/api";
import { useNavigate } from "react-router-dom";
import { errorNotify, successNotify } from "../../../utils/Toast";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const res = await axios.get(`${BASE_API}/admin/users`, {
          withCredentials: true,
        });
        setUsers(res.data.allUsers);
      } catch (error) {
        errorNotify(error.res.data.message)
      }
    };
    getAllUsers();
  }, []);

  const editUser = (user) => {
    navigate(`/admin/update-user/${user._id}`);
  };

  const deleteUser = async (user) => {
    try {
      const res = await axios.delete(`${BASE_API}/admin/users/${user._id}`, {
        withCredentials: true,
      });
      successNotify(res.data.message);
    } catch (error) {
      errorNotify(error.response.data.message);
    }
  };

  return (
    <main className="">
      <div className="flex items-center gap-10 p-5">
        <h2 className="text-[22px] font-semibold">Users</h2>
      </div>
      <div className="overflow-x-auto">
        {/* {products ? ( */}
        <table className="min-w-full bg-white shadow-md rounded-lg ">
          <thead>
            <tr>
              <th className="py-3 px-4 bg-gray-100 font-bold uppercase text-sm text-gray-600 border-b border-gray-200 text-left">
                Name
              </th>
              <th className="py-3 px-4 bg-gray-100 font-bold uppercase text-sm text-gray-600 border-b border-gray-200 text-left">
                Email
              </th>

              <th className="py-3 px-4 bg-gray-100 font-bold uppercase text-sm text-gray-600 border-b border-gray-200 text-left">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index} className={"bg-gray-50 hover:bg-gray-100"}>
                <td className="py-3 px-4 border-b border-gray-200 text-gray-700">
                  {user.name}
                </td>
                <td className="py-3 px-4 border-b border-gray-200 text-gray-700">
                  {user.email}
                </td>

                <td className="py-3 px-4 border-b border-gray-200 text-gray-700">
                  <div className="flex">
                    <button
                      onClick={() => editUser(user)}
                      className="bg-green-600 text-white rounded py-1 px-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteUser(user)}
                      className="bg-red-600 ml-5 text-white rounded py-1 px-2"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default AdminUsers;
