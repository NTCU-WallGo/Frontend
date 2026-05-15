// @ts-nocheck

// export async function callcore() {
//   try {
//     const res = await fetch('http://localhost:8000/app/core')
//     const data = await res.json()
//     return data.message
//   } catch (error) {
//     throw new Error(error.message)
//   }
// }

// export async function callmodele() {
//   try {
//     const res = await fetch('http://localhost:8000/app/model')
//     const data = await res.json()
//     return data.message
//   } catch (error) {
//     throw new Error(error.message)
//   }
// }
// export async function callrouter() {
//   try {
//     const res = await fetch('http://localhost:8000/app/router')
//     const data = await res.json()
//     return data.message
//   } catch (error) {
//     throw new Error(error.message)
//   }
// }

import {logout} from '../lib/auth.js'

const API_BASE='http://localhost:8000/api';

export async function get(path){
  const token=localStorage.getItem("token");
  const headers={
    'Content-Type': 'application/json'
  }
  if(token)
    headers['Authorization']=`Bearer ${token}`;

  try{
    const res=await fetch(`${API_BASE}${path}`,{
      method: 'GET',
      headers: headers
    });

    if(res.status==401){
      logout();
      const event=new CustomEvent('token_expired');
      window.dispatchEvent(event);
      return null;
    }
    return await res.json();
  }catch(error){
    throw new Error(error.message);
  }
}

 export async function post(path,payload,type){
  try{
    const res=await fetch(`${API_BASE}${path}`,{
      method:'POST',
      headers:{
        'Content-Type':type,
      },
      body:payload
    });
    const data = await res.json();
    if (!res.ok) {
      if(res.status===422)
        throw new Error("格式錯誤");
      throw new Error(data.detail);
    }
    return data;
  }catch(error){
    throw new Error(error.message);
  }
}