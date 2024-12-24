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