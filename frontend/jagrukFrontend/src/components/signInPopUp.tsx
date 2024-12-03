import { FaGoogle, FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCallback, useState } from "react";
import { useRecoilState } from "recoil";
import { isSignInPop, isSignUpPop } from "@/atoms";
import axios from "axios"
import {SignUpfield} from "@ayush8679/common"

interface propsForDialog {
  titleForButton: string;
  classForDialog: string;
}

export default function DialogSignInButton({
  titleForButton,
  classForDialog,
}: propsForDialog) {

    const [isSignInValue, setIsSignIn] = useRecoilState(isSignInPop);
    const [isSignUpValue, setIsSignUp] = useRecoilState(isSignUpPop);
    const [email, setEmail] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const handleInToUpSwitch = useCallback(() => {
        setIsSignIn(() => false)
        setIsSignUp(() => true)
    },[isSignInValue, isSignUpValue])

    const userField = {
        email : email,
        userName : userName,
        password : password
    }

    const isCorrectField = {
        email : userField.email typeof 
    }

    const sendSignUpReq = useCallback(async () => {
        const req = await axios.post("https://my-app.ayushthestar8679.workers.dev/api/v1/user/signup", {
            
        })
        console.log(req);
    }, [])

    return (
        <Dialog open={isSignInValue} onOpenChange={setIsSignIn}>
        <DialogTrigger asChild>
            <Button variant="outline" className={classForDialog}>
            {titleForButton}
            </Button>
        </DialogTrigger>
        <DialogContent aria-describedby="hidden-description" aria-description="Sign" className="sm:w-3/4 lg:w-1/2 lg:h-4/5 h-3/4 sm:h-auto mx-auto font-serif">
            <DialogHeader>
            <DialogTitle className="text-center font-bold text-lg sm:text-xl">
                Sign In to Jagruk
            </DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 px-4 sm:px-8">
            <div>
                <Label htmlFor="email" className="block mb-1">
                Email
                </Label>
                <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="w-full"
                required
                />
            </div>
            <div>
                <Label htmlFor="password" className="block mb-1">
                Password
                </Label>
                <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="w-full"
                required
                />
            </div>
            <div>
                <Button
                type="button"
                variant="outline"
                className="flex items-center rounded-3xl border-gray-900 justify-center w-full gap-2"
                >
                <MdEmail className="2-5 h-5"/>
                Sign In With Email
                </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <Button
                type="button"
                variant="outline"
                className="flex items-center rounded-3xl border-gray-900 justify-center w-full gap-2"
                >
                <FaGoogle className="w-5 h-5" />
                Sign In with Google
                </Button>
                <Button
                type="button"
                variant="outline"
                className="flex items-center rounded-3xl border-gray-900 justify-center w-full gap-2"
                >
                <FaGithub className="w-5 h-5" />
                Sign In with Github
                </Button>
            </div>
            <div className="text-center mt-4">
                Don’t have an account?{" "}
                <button onClick={handleInToUpSwitch} className="text-green-800 hover:cursor-pointer hover:underline">
                Sign up
                </button>
            </div>
            </div>
            <DialogFooter className="text-sm text-center font-light mt-4 px-4">
            <p>
                By signing in, you agree to Jagruk’s Terms of Service and
                acknowledge that Jagruk’s Privacy Policy applies to you.
            </p>
            </DialogFooter>
        </DialogContent>
        </Dialog>
    );
}
