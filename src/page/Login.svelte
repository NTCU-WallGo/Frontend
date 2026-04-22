<script>
  import { createEventDispatcher, onMount } from 'svelte';
  import {post} from '../api/api.js'
  import {login} from '../lib/auth.js'

  const dispatch = createEventDispatcher();
  let username = '';
  $: password = '';
  $: showPwd = false;
  let s='';

function forget(){
    dispatch('forget');
  }
  function pwdVisible(){
    showPwd=!showPwd;
  }
  async function enter() {
    const FormData=new URLSearchParams();
    FormData.append('username',username);
    FormData.append('password',password);
    try{
      document.getElementById('mes').style.color='black';
      s="loading...";
      const result=await post('/login',FormData,'application/x-www-form-urlencoded');
      document.getElementById('mes').style.color='#18af17';
      s="登入成功!";
      login(result.access_token);
      dispatch('login');
    }catch(err){
      document.getElementById('mes').style.color='#af1817';
      s=err.message;
    }
  }
  function signup(){
    dispatch('signup');
  }
</script>

<div class="login-container">
  <h1>Log In</h1>
  <div class="login-form">
    <div class="inputs">
      <input
        type="text"
        bind:value={username}
        placeholder="帳號"
        spellcheck="false"
        on:keydown={(e) => e.key === 'Enter' && enter()}
      />
    </div>
    <div class="inputs">
      <input
        type={showPwd?"text":"password"}
        bind:value={password}
        placeholder="密碼"
        on:keydown={(e) => e.key === 'Enter' && enter()}
      />
      <button on:click={pwdVisible} class="pwdShow">
        {#if showPwd}
          <img src="/src/assets/eye.png" alt="close"  height=20px width=20px>
        {:else}
          <img src="/src/assets/close-eye.png" alt="show" height=20px width=20px>
        {/if}
      </button>
    </div>
    <p id="mes">{s}</p>
{#if s && s !== 'loading...' && s !== '登入成功!'}
  <div class="forget-link-container">
    <button type="button" class="link-button" on:click={forget}>
      forget password
    </button>
  </div>
{/if}
    <div style="display: flex; gap: 20px; justify-content: center;">
      <button on:click={signup}>Sign Up</button>
      <button on:click={enter}>Enter</button>
    </div>
  </div>
</div>

<style>
  .login-container {
    display: flex;
    flex-direction: column;
    align-items: center;
     margin-top: 10%;
    height: 100%;
    width: 100%;
  }
  .link-button {
    background: none;
    border: none;
    color: #666;
    text-decoration: underline;
    cursor: pointer;
    font-size: 0.8rem;
    padding: 0;
  }
  .login-form {
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 300px;
   
    gap: 10px;
  }
  .inputs input{
    border: none;
    outline: none;
    width: 250px;
    margin: 0px;
  }
  .inputs button{
    background-color: #ffffff;
    border: none;
    padding: 0;
    margin-left: auto;
    margin-right: 10px;
  }
  .inputs button::after{
    display: none;
  }
  .inputs{
    background-color: #ffffff;
    width: 300px;
    height: 35px;
    margin-top: 10px;
    border: 2px solid #000000;
    border-radius: 10px;
    text-align: left;
    align-items: center;
    display: flex;
  }
</style>
