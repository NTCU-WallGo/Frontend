// @ts-nocheck

import { writable } from "svelte/store";
import {get} from '../api/api.js'

const saveToken=typeof window != 'undefined' ? localStorage.getItem('token'):null;

export const authStore=writable({
    isLogin: !!saveToken,
    token: saveToken,
    user: null
});

export async function getusername(){
    if(!saveToken){
        return 'Guest';
    }

    try{
        const data=await get('/me');
        const username=data.message.split(", ")[1].split("!")[0]

        authStore.update(state => ({...state,user:username}));
        return username;
    }catch(err){
        return null;
    }
}

export async function login(token){
    localStorage.setItem('token',token);
    const username=await getusername();
    authStore.set({
        isLogin: true,
        token: token,
        user: username
    });
    console.log(username);
}

export function logout(){
    localStorage.removeItem('token');
    authStore.set({
        isLogin: false,
        token: null,
        user: null
    });
}