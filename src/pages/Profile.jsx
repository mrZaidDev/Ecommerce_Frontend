import React from "react";

const Profile = () => {
  return (
    <div className="max-w-[500px]  m-auto">
      {/* Name Email */}
      <div className="">
        <div className="flex gap-4 m-2 text-2xl">
          <span>Name</span>
          <span>Zaid</span>
        </div>
        <div className="flex gap-4 m-2 text-2xl">
          <span>Email</span>
          <span>zaidmrzaid71@gmail.com</span>
        </div>
      </div>
      {/* Logout Button */}
      <div className="flex items-center justify-center mt-4">
        <button className="bg-red-400 px-4 rounded">Logout</button>
      </div>
    </div>
  );
};

export default Profile;
