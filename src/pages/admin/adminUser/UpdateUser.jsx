import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { BASE_API } from "../../../config/api";
import axios from "axios";
import useFetchById from "../../../hooks/useFetchById";
import { useState } from "react";
import { errorNotify, successNotify } from "../../../utils/Toast";
import {useNavigate} from 'react-router-dom'

const UpdateUser = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const { id } = useParams();
  

  const { response } = useFetchById(`${BASE_API}/admin/users/${id}`);

  useEffect(() => {
    if (response) {
      setUsername(response.name);
      setEmail(response.email);
    }
  }, [response]);

  const handleUpdateUser = async (id) => {
    try {
      const res = await axios.put(
        `${BASE_API}/admin/users/${id}`,
        {
          name: username,
          email: email,
        },
        { withCredentials: true },
      );
      successNotify(res.data.message)
      navigate('/admin/users')
    } catch (error) {
      errorNotify(error.res.data.message)
    }
  };

  if (response) {
    return (
      <div className=" flex justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 sm:p-8">
          <h1 className="text-2xl font-semibold text-gray-800 text-center mb-6">
            Update User
          </h1>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <button
            className="w-full mt-6 bg-blue-600 text-white py-2 rounded-lg opacity-80 cursor-not-allowed"
            onClick={() => handleUpdateUser(response._id)}
          >
            Save Changes
          </button>
        </div>
      </div>
    );
  }
};

export default UpdateUser;
