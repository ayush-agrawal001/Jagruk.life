import Footer from "@/components/footer";
import DialogSignUpButton from "@/components/signUpPopup";
import { NavBar } from "@/components/topNavBar";
import { Cover } from "@/components/ui/cover";
import { Toaster } from "@/components/ui/toaster";
// import { auth } from "@/firebase";
// import { onAuthStateChanged } from "firebase/auth";
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

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
      <div className="">
        <div className="flex flex-col h-[98vh] w-full dark:bg-black bg-green-100  dark:bg-grid-white/[0.1] bg-grid-black/[0.17] relative items-center justify-center">
          {/* Radial gradient for the container to give a faded look */}
          <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-green-100 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
          <h1
        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold max-w-[90%] sm:max-w-4xl md:max-w-5xl lg:max-w-6xl xl:max-w-7xl 
        mx-auto text-center mt-6 relative z-20 py-4 bg-clip-text text-transparent 
        bg-gradient-to-b from-gray-900 via-neutral-800 to-neutral-800 dark:from-neutral-800 dark:via-white 
        dark:to-white font-serif hover:cursor-pointer"
      >
        Voices of the <Cover>World</Cover>
      </h1>

      <div
        className="text-lg sm:text-xl md:text-2xl lg:text-2xl xl:text-3xl font-light max-w-[90%] sm:max-w-4xl md:max-w-5xl lg:max-w-6xl xl:max-w-7xl 
        mx-auto text-center mt-4 relative z-20 py-4 bg-clip-text text-transparent 
        bg-gradient-to-b from-neutral-900 via-neutral-800 to-neutral-800 dark:from-neutral-800 dark:via-white 
        dark:to-white font-serif space-y-2 sm:space-y-3 md:space-y-4"
      >
        <h3>Share your stories. Explore new perspectives.</h3>
        <h3>Connect with ideas that matter.</h3>
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
