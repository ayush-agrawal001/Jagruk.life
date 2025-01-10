import { auth } from "../firebase/index";
import { toast } from "@/hooks/use-toast";
import axios from "axios";

const handleAuthSignIn = async (user: any, password: string) => {
    try {
        const response = await axios.post("https://my-app.ayushthestar8679.workers.dev/api/v1/user/signin", {
            userName: user.uid.slice(0, 7),
            email: user.email,
            password : password,
        });
        const token = response.data.token;
        localStorage.setItem("token", token);
        console.log("Signed in successfully");
        return response;
    } catch (error) {
        console.log("Error while signing in", error);
        throw error;
    }
};

const updateProfilePicture = async (photoURL: string | null) => {
    try {
        await axios.post(
            "https://my-app.ayushthestar8679.workers.dev/api/v1/user/update/profilepic",
            {
                profilePic: photoURL || "",
            },
            { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );
        console.log("Profile pic updated successfully");
    } catch (error) {
        console.log("Error while updating profile pic");
    }
};

const handleNavigation = (setIsUser: any, navigate: any) => {
    setIsUser(true);
    setTimeout(() => {
        setIsUser(false);
        navigate("/dashboard");
    }, 2000);
};

export const signInWithGoogle = async (navigate: any, googleProvider: any, signInWithPopup: any, setIsUser: any) => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;
        if (user) {
            const token = await user.getIdToken();
            console.log(token);
            const firstName = user.displayName!.split(" ")[0];
            const lastName = user.displayName!.split(" ")[1];
            
            const response = await axios.post("https://my-app.ayushthestar8679.workers.dev/api/v1/user/signup", {
                email: user.email,
                firstName,
                lastName,
                userName: user.uid.slice(0, 7),
                password: "GoogleAuth",
            });

            if (response.data.message === "Username already exists" || response.data.message === "Email already exists") {
                await handleAuthSignIn(user, "GoogleAuth");
                toast({
                    title: "Signing in",
                    description: "Account already exists! Signing in with same credentials",
                });
                await updateProfilePicture(user.photoURL);
            } else {
                await handleAuthSignIn(user, "GoogleAuth");
                await updateProfilePicture(user.photoURL);
            }
            handleNavigation(setIsUser, navigate);
        }
    } catch (error) {
        toast({
            title: "Error",
            description: "Error signing with email",
        });
        console.log("Error while sign in :- ", error);
        return navigate("/");
    }
};

export const signInWithGithub = async (navigate: any, githubProvider: any, signInWithPopup: any, setIsUser: any) => {
    try {
        const result = await signInWithPopup(auth, githubProvider);
        const user = result.user;
        if (user) {
            const token = await user.getIdToken();
            console.log(token);
            
            const response = await axios.post("https://my-app.ayushthestar8679.workers.dev/api/v1/user/signup", {
                email: user.email,
                firstName: user.displayName!.split(" ")[0],
                lastName: user.displayName!.split(" ")[1],
                userName: user.uid.slice(0, 7),
                password: "GithubAuth",
            });

            if (response.data.message === "Username already exists" || response.data.message === "Email already exists") {
                await handleAuthSignIn(user, "GithubAuth");
                toast({
                    title: "Signing in",
                    description: "Account already exists! Signing in with same credentials",
                });
                await updateProfilePicture(user.photoURL);
            } else {                
                await handleAuthSignIn(user, "GithubAuth");
                await updateProfilePicture(user.photoURL);
            }
            handleNavigation(setIsUser, navigate);
        }
    } catch (error) {
        toast({
            title: "Error",
            description: "Error signing with this email please try with different Account!",
        });
        console.log(error);
        return navigate("/");
    }
};
