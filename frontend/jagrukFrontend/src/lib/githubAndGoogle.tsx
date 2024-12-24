import { auth } from "../../firebase/index";
import { toast } from "@/hooks/use-toast";
import axios from "axios";

export const signInWithGoogle = async (navigate: any, googleProvider: any, signInWithPopup: any, setIsUser : any) => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
            if (user) {
                const token = await user.getIdToken();
                console.log(token);
                console.log(user.photoURL);
                const firstName = user.displayName!.split(" ")[0];
                const lastName = user.displayName!.split(" ")[1];
                const response = await axios.post("https://my-app.ayushthestar8679.workers.dev/api/v1/user/signup", {
                    email: user.email,
                    firstName: firstName,
                    lastName: lastName,
                    userName: user.uid.slice(0, 7),
                    password: "GoogleAuth",
                });
                if(response.data.message === "Username already exists" || response.data.message === "Email already exists"){
                    try {
                    const response = await axios.post("http://127.0.0.1:8787/api/v1/user/signin", {
                        userName: user.uid.slice(0, 7),
                        email: user.email,
                        password: "GoogleAuth",
                    });

                    const token = response.data.token;
                    localStorage.setItem("token", token);
                    console.log("Signed in with google auth");
                    }catch(error){
                        console.log("Error while signing in with google auth", error);
                    }
                    toast({
                        title: "Signing in",
                        description: "Account already exists! Signing in with same credentials",
                    })
                    try {
                        await axios.post("https://my-app.ayushthestar8679.workers.dev/api/v1/user/update/profilepic", {
                            profilePic: user.photoURL ? user.photoURL : "",
                        });
                        // console.log("Profile pic updated successfully");
                    } catch (error) {
                        console.log("Error while updating profile pic");
                    }

                    setIsUser(true);
                    setTimeout(() => {
                        setIsUser(false);
                        navigate("/dashboard");
                    }, 2000);
                }else{
                    try {
                        await axios.post("https://my-app.ayushthestar8679.workers.dev/api/v1/user/signin", {
                            userName: user.uid.slice(0, 7),
                            email: user.email,
                            password: "GoogleAuth",
                        });
                        const token = response.headers.Authorization.split(" ")[1];
                        localStorage.setItem("Authorization", token);
                    console.log("Signed in with google auth");
                    }catch(error){
                        console.log("Error while signing in with google auth");
                    }
                    setIsUser(true);
                    setTimeout(() => {
                        setIsUser(false);
                        navigate("/dashboard");
                    }, 2000);
                }
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Error signing with email",
            });
            console.log("Error while sign in :- ", error)
            return navigate("/");
        }
    };

export const signInWithGithub = async (navigate: any, githubProvider: any, signInWithPopup: any, setIsUser : any) => { 
    try {
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
                try {
                    await axios.post("https://my-app.ayushthestar8679.workers.dev/api/v1/user/signin", {
                        email: user.email,
                        password: "GithubAuth",
                    });
                    }catch(error){
                        console.log("Error while signing in with github auth");
                    }
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
            description: "Error signing with this email please try with diffrent Acount!",
        });
        console.log(error)
        return navigate("/");
    }
}