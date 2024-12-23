import Footer from "@/components/footer";
import DialogSignUpButton from "@/components/signUpPopup";
import { NavBar } from "@/components/topNavBar";
import { Cover } from "@/components/ui/cover";
import { Toaster } from "@/components/ui/toaster";
// import { auth } from "@/firebase";
// import { onAuthStateChanged } from "firebase/auth";
// import { useEffect } from "react";
// import { Navigate, useNavigate } from "react-router-dom";

export default function Home() {
  
  // const navigate = useNavigate();

  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       if (user.emailVerified) {
  //         // Allow access to content
  //         console.log("User is verified.");
  //         navigate("/dashboard")
  //         // return <Navigate to = "/dashboard"></Navigate>
  //       } else {
  //         // Restrict access and notify the user
  //         console.log("Please verify your email.");
  //       }
  //     } else {
  //       console.log("No user is signed in.");
  //     }
  //   });
  // }, [])


  return (
    <div className="bg-green-100 dark:bg-neutral-900 min-h-screen">
      <NavBar></NavBar>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="col-span-1 md:col-span-2 p-6 sm:p-10 md:p-20 lg:p-40 xl:p-20 mx-auto">
          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-8xl font-bold max-w-4xl md:max-w-5xl lg:max-w-7xl 
            mx-auto text-center mt-6 relative z-20 py-4 bg-clip-text text-transparent 
            bg-gradient-to-b from-gray-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white 
            dark:to-white font-serif hover:cursor-pointer"
          >
            Voices of the <Cover>World</Cover>
          </h1>

          <div
            className="text-base sm:text-lg md:text-xl lg:text-xl font-light max-w-4xl md:max-w-5xl lg:max-w-7xl 
            mx-auto text-center mt-4 relative z-20 py-4 bg-clip-text text-transparent 
            bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white 
            dark:to-white font-serif space-y-2"
          >
            <h3 className="text-lg sm:text-xl md:text-2xl">Share your stories. Explore new perspectives.</h3>
            <h3 className="text-lg sm:text-xl md:text-2xl">Connect with ideas that matter.</h3>
          </div>

          <div className="flex justify-center mt-6">
           <DialogSignUpButton titleForButton={"Start reading"} classForDialouge={`text-base sm:text-lg hover:bg-green-950
            md:text-xl text-white py-2 sm:py-6 px-6 sm:px-12 rounded-xl bg-green-950 font-serif hover:text-green-100 hover:scale-110
            transition-all duration-300`}></DialogSignUpButton>
          </div>
        </div>
        <Toaster></Toaster>
      </div>
      <Footer></Footer>
    </div>
  );
}
