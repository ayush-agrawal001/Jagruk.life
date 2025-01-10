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
import { useRecoilState, useSetRecoilState } from "recoil";
import { isSignInPop, isSignUpPop, isUserVerified } from "@/atoms";
import { signInField, SignInField } from "@ayush8679/common";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { signInWithGithub, signInWithGoogle } from "@/lib/githubAndGoogle";

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
    const [error , setError] = useState<Record<string, string>>();
    const [formData, setFormData] = useState<SignInField>({
        userName : "",
        password : ""
    });


    const navigate = useNavigate();

    const checkCredentials = () => {
        const result = signInField.safeParse(formData);
        if (!result.success) {
            const newError : Record<string, string> = {};
            result.error.errors.forEach((err) => {
                if (err.path[0]) {
                    newError[err.path[0] as string] = err.message
                }
            })
            setError(newError);
            console.log(newError)
            return false;
        }else{
            setError({});
            return true;
        }}

    const handleChange = useCallback((e : React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setFormData((prev) => ({
            ...prev,
            [name] : value
        }))
        // console.log(formData)
    }, [formData])

    const handleInToUpSwitch = useCallback(() => {
        setIsSignIn(() => false)
        setIsSignUp(() => true)
    },[isSignInValue, isSignUpValue])

    const signInByEmail = useCallback(async () => {
        try {
            if(checkCredentials()){
                try {
                    const response = await axios.post("https://my-app.ayushthestar8679.workers.dev/api/v1/user/signin", formData);
                    if (response.status === 201) {
                        navigate("/dashboard");
                    }else{
                        toast({
                            title: "Error",
                            description: "Error signing with user name",
                        });
                        navigate("/");
                    }
                } catch (error : Error | any) {
                    if(error.status === 403){
                        toast({
                            title: "Error",
                            description:"Wrong password please try again",
                        });
                        return navigate("/");
                    }else if (error.status === 402) {
                        toast({
                            title: "Error",
                            description: "User not found Please Sign-In",
                        });
                        return navigate("/");
                    }else if (error.status === 500) {
                        toast({
                            title: "Error",
                            description: "Server error verifying the user at sighn-In",
                        });
                        return navigate("/");
                    }
                    navigate("/");
                    console.log(error.status)
                }
                console.log(formData)
                
            }
        } catch (error) {
            console.log(error)
        }
    },[formData])

    const setIsUser = useSetRecoilState(isUserVerified);

    const handleSignInWithGoogle = useCallback(async () => {
        navigate("/verifyemail");
        const googleProvider = new GoogleAuthProvider();
        await signInWithGoogle(navigate ,googleProvider, signInWithPopup, setIsUser);
    },[]);

    const handleSignInWithGithub = useCallback(async () => {
        navigate("/verifyemail");
        const githubProvider = new GithubAuthProvider();
        await signInWithGithub(navigate ,githubProvider, signInWithPopup, setIsUser);
    },[]);

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
                <Label htmlFor="userName" className="block mb-1">
                User Name
                </Label>
                <Input
                id="UsrName"
                type="text"
                name="userName"
                placeholder="Enter your username"
                className="w-full"
                onChange={ (e) => {handleChange(e)}}
                required
                />
                {error && (error.userName && <p className="text-sm text-red-500">{error.userName}</p>)}
            </div>
            <div>
                <Label htmlFor="password" className="block mb-1">
                Password
                </Label>
                <Input
                id="password"
                type="password"
                name="password"
                placeholder="Enter your password"
                className="w-full"
                onChange={ (e) => {handleChange(e)}}
                required
                />
                {error && (error.password && <p className="text-sm text-red-500">{error.password}</p>)}
            </div>
            <div>
                <Button
                type="button"
                variant="outline"
                className="flex items-center rounded-3xl border-gray-900 justify-center w-full gap-2"
                onClick={signInByEmail}
                >
                <MdEmail className="2-5 h-5"/>
                Sign In With User Name
                </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <Button
                type="button"
                variant="outline"
                className="flex items-center rounded-3xl border-gray-900 justify-center w-full gap-2"
                onClick={() => handleSignInWithGoogle()}
                >
                <FaGoogle className="w-5 h-5" />
                Sign In with Google
                </Button>
                <Button
                type="button"
                variant="outline"
                className="flex items-center rounded-3xl border-gray-900 justify-center w-full gap-2"
                onClick={() => handleSignInWithGithub()}
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
