import React, { useEffect, useState } from "react";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import ProfileCard from "../cards/profileCard";
import SearchBar from "../searchBar/SearchBar";
import axiosInstance from "../../utils/axiosinstance";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = ({userInfo, onSearchNote, handleClearSearch}) => {
  //search value states
  const [searchQuery, setSearchQuery] = useState("");

  // console.log(searchQuery)

  //clear search value
  const onClearSearch = () => {
    setSearchQuery("");
    handleClearSearch()
  };

  //search notes
  const handleSearch = () => {
    if (searchQuery) {
      onSearchNote(searchQuery);
    }
  };


  // navigate config
  const navigate = useNavigate();

  const Logout = () => {
    // Add your logout logic here
    localStorage.clear();
    navigate("/login");
    toast.error("Your Logout successfully !");
  };
  
  // user check 
  const user = localStorage.getItem('token')

  return (
    <>
      <ToastContainer />
      <div className="bg-white flex justify-between items-center sm:px-20 px-4 py-2 drop-shadow">
        <h2 className="sm:text-3xl text-1xl font-medium text-black py-2 cursor-pointer">
          <NavLink to="/">TodoList App</NavLink>
        </h2>
        <ul className="lg:flex gap-10 px-4 text-[12px] font-light hidden">
          <li>
            <NavLink to="/dashboard">Dashboard</NavLink>
          </li>
          {!user &&
          <>
          <li>
            <NavLink to="/signup">Signup</NavLink>
          </li>
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
          </> 
          }
        </ul>
        <div className="sm:flex hidden">
          <SearchBar
            value={searchQuery}
            onChange={({ target }) => {
              setSearchQuery(target.value)
            }}
            onClearSearch={onClearSearch}
            handleSearch={handleSearch}
          />
        </div>
        <div>
        {user &&
          <ProfileCard onLogout={Logout} userInfo={userInfo} />
        }  
        </div>
      </div>
    </>
  );
};

export default Navbar;
