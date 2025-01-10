import DialogSignInButton from "./signInPopUp";
import DialogSignUpButton from "./signUpPopup";
import { Button } from "./ui/button";

export function NavBar() {
    return (
      <div className="fixed backdrop-blur-lg top-0 z-10 w-full h-14 px-4 md:px-10 lg:px-64 flex items-center border-b-2 border-gray-400">
        <button className="text-gray-500 hover:text-green-500">
          <h1 className="text-xl md:text-2xl text-black font-serif font-semibold hover:text-green-800">
            Jagruk.life
          </h1>
        </button>
        <div className="flex-grow"></div>
        <div className="flex items-center justify-center space-x-4 md:space-x-6">
          <Button
            className="hidden hover:bg-transparent hover:underline bg-transparent text-center shadow-none  border-0  sm:block text-sm md:text-lg text-black font-serif hover:text-green-800"
          >
            My story
          </Button>
          <Button
            className="hidden hover:bg-transparent hover:underline bg-transparent text-center shadow-none  border-0 sm:block text-sm md:text-lg text-black font-serif hover:text-green-800"
          >
            Write
          </Button>
          <DialogSignInButton titleForButton="Sign in" classForDialog="hover:underline bg-transparent text-center shadow-none 
          border-0 sm:block text-sm md:text-lg text-black font-serif hover:text-green-800"></DialogSignInButton>
          <DialogSignUpButton titleForButton={"Get started"} classForDialouge={`text-base sm:text-lg hover:bg-green-950
            md:text-xl text-white py-2 sm:py-3 px-6 sm:px-9 rounded-xl bg-green-950 font-serif hover:text-green-100 hover:scale-110
            transition-all duration-300`}></DialogSignUpButton>
        </div>
      </div>
    );
  }
  