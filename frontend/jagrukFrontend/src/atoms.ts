import { atom } from "recoil";

export const isSignInPop = atom({
    key : "isSignInPop",
    default : false
});

export const isSignUpPop = atom({
    key : "isSignUnPop",
    default : false
});

export const isUserVerified = atom({
    key : "isUserVerified",
    default : false
});

export const topic = atom({
    key : "topic",
    default : "For you"
});

export const userProfileMeta = atom({
    key : "userProfileMeta",
    default : {
        profilePic : "",
        fallbackText : "AA",
        id : ""
    }
});

export const fileAtom = atom({
    key : "fileAtom",
    default : ""
});