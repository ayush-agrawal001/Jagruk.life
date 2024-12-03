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
import { useRecoilState } from "recoil";
import { isSignInPop, isSignUpPop } from "@/atoms";
import { useCallback } from "react";

interface propsForDialogue {
  titleForButton: string;
  classForDialouge: string;
}

export default function DialogSignUpButton({
  titleForButton,
  classForDialouge,
}: propsForDialogue) {

    const [isSignUpValue, setIsSignUp] = useRecoilState(isSignUpPop);
    const [isSignInValue, setIsSignIn] = useRecoilState(isSignInPop);

    const handleUptoInSwitch = useCallback(() => {
        setIsSignUp(() => false)
        setIsSignIn(() => true)
    },[isSignInValue, isSignUpValue])

    return (
        <Dialog open={isSignUpValue} onOpenChange={setIsSignUp}  >
        <DialogTrigger asChild>
            <Button variant="outline" className={classForDialouge}>
            {titleForButton}
            </Button>
        </DialogTrigger>
        <DialogContent aria-describedby="hidden-description" aria-description="Sign" className="sm:w-3/4 lg:w-1/2 lg:h-4/5 h-3/4 sm:h-auto mx-auto font-serif">
            <DialogHeader>
                <DialogTitle className="text-center font-bold text-lg sm:text-xl">
                    Join Jagruk
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
                    <Label htmlFor="username" className="block mb-1">
                    Username
                    </Label>
                    <Input
                    id="username"
                    type="text"
                    placeholder="Choose a username"
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
                    <MdEmail className="w-5 h-5" />
                    Sign Up With Email
                    </Button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <Button
                        type="button"
                        variant="outline"
                        className="flex items-center rounded-3xl border-gray-900 justify-center w-full gap-2"
                        >
                        <FaGoogle className="w-5 h-5" />
                        Sign Up with Google
                        </Button>
                        <Button
                        type="button"
                        variant="outline"
                        className="flex items-center rounded-3xl border-gray-900 justify-center w-full gap-2"
                        >
                        <FaGithub className="w-5 h-5" />
                        Sign Up with Github
                        </Button>
                    </div>
                    <div className="text-center mt-4">
                        Already have an account?{" "}<button onClick={handleUptoInSwitch} className="hover:underline">Sign in</button>
                    </div>
            </div>   
            <DialogFooter className="text-sm text-center font-light mt-4 px-4">
            <p>
                Click “Sign up” to agree to Jagruk’s Terms of Service and
                acknowledge that Jagruk’s Privacy Policy applies to you.
            </p>
            </DialogFooter>
        </DialogContent>
        </Dialog>
    );
}
