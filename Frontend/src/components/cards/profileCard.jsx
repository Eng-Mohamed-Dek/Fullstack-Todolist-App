import React from "react";
import { getUserProfile } from "../../helpers/validations";
// import { ToastContainer, toast } from 'react-toastify';
// import "react-toastify/dist/ReactToastify.css";

const ProfileCard = ({ onLogout , userInfo}) => {
  
  // console.log(userInfo.fullName)
  // if (userInfo) {
  //   toast.success("your successfull login");
  // }

  return (
    // <><ToastContainer />
      <div className="flex items-center gap-3">
      <div className="bg-blue-400 w-12 h-12 flex items-center justify-center rounded-full text-white text-[23px] ">
        {getUserProfile(userInfo?.user.fullName)}
      </div>
      <p className="text-[18px] font-medium">{userInfo?.user.fullName}</p>
      <button className="text-sm text-slate-700 underline" onClick={onLogout}>
        LogOut
      </button>
    </div>
    // </>
  );
};

export default ProfileCard;
