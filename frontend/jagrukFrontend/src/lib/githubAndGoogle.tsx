import { isUserVerified } from "@/atoms";
import { auth } from "@/firebase";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { useRecoilState } from "recoil";

export const signInWithGoogle = async (navigate: any, googleProvider: any, signInWithPopup: any, setIsUser : any) => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
            if (user) {
                const token = await user.getIdToken();
                console.log(token);
                console.log(user);
                const response = await axios.post("https://my-app.ayushthestar8679.workers.dev/api/v1/user/signup", {
                    email: user.email,
                    firstName: user.displayName!.split(" ")[0],
                    lastName: user.displayName!.split(" ")[1],
                    userName: user.uid.slice(0, 7),
                    password: "GoogleAuth",
                });
                if(response.data.message === "Username already exists" || response.data.message === "Email already exists"){
                    toast({
                        title: "Signing in",
                        description: "Account already exists! Signing in with same credentials",
                    })
                    setIsUser(true);
                    setTimeout(() => {
                        setIsUser(false);
                        navigate("/dashboard");
                    }, 2000);
                }
                setIsUser(true);
                setTimeout(() => {
                    setIsUser(false);
                    navigate("/dashboard");
                }, 2000);
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Error signing with email",
            });
            console.log("Error while sign in :- ", error)
            navigate("/");
        }
    };

export const signInWithGithub = async (navigate: any, githubProvider: any, signInWithPopup: any) => { 
    try {
        const [isUser, setIsUser] = useRecoilState(isUserVerified);
        const result = await signInWithPopup(auth, githubProvider); 
        const user = result.user;
        console.log(user) 
        if (user) {
            const token = await user.getIdToken();
            console.log(token);
            console.log(user);
            const response = await axios.post("https://my-app.ayushthestar8679.workers.dev/api/v1/user/signup", {
                email: user.email,
                firstName: user.displayName!.split(" ")[0],
                lastName: user.displayName!.split(" ")[1],
                userName: user.uid.slice(0, 7),
                password: "GithubAuth",
            });
            
            if(response.data.message === "Username already exists" || response.data.message === "Email already exists"){
                toast({
                    title: "Signing in",
                    description: "Account already exists! Signing in with same credentials",
                })
                setIsUser(true);
                setTimeout(() => {
                    setIsUser(false);
                    navigate("/dashboard");
                }, 2000);
            }
            setIsUser(true);
            setTimeout(() => {
                setIsUser(false);
                navigate("/dashboard");
            }, 2000);
        }
    } catch (error : any) {
        toast({
            title: "Error",
            description: "Error signing with email please try with diffrent Acount!",
        });
        console.log(error)
    }
}