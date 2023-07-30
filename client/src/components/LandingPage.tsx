import React from "react";
import Logo from "../assets/Logo.png";

const LandingPage = () => {
  const onHandleGoogleSignin = () => {
    console.log("google signin");
    window.open("http://localhost:4000/auth/google", "_self");
  };
  return (
    <div className="flex justify-center items-center h-screen bg-[#E9EAEC]">
      <div className="border drop-shadow-2xl shadow-2xl bg-[#e9eaec9d] h-[60%] w-[50%] flex flex-col items-center">
        <div className="flex items-center mt-20 gap-48">
          <div className="flex flex-col">
            <h1 className="text-6xl italic text-black font-bold">Queeler</h1>
            <span className="text-4xl text-black font-bold">A chat app</span>
          </div>

          <img
            src={Logo}
            alt="logo"
            className="bg-none ml-4 w-[400px] h-[300px]"
          ></img>
        </div>

        <button
          onClick={onHandleGoogleSignin}
          className="mt-16 px-4 py-2 bg-[#a3a3a3] text-white rounded-2xl"
        >
          SignIn With Google
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
