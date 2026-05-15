<script>
  import { createEventDispatcher } from 'svelte';
  import {post} from '../api/api.js'
  import {onMount} from 'svelte'

  const dispatch = createEventDispatcher();
  let username = '';
  $: password = '';
  $: showPwd = false;
  let email='';
  let s="";
  $: jwtToken = "";
  $: mesColor = (() => {
    if (s === '註冊成功!') return '#18af17';
    if (s === 'loading...') return 'black';
    return '#af1817'; 
  })(); 

  onMount(() => {
    (/** @type {any} */ (window))['verify']=(/** @type {any} */token)=>{
      console.log("成功拿到 Token:", token);
      jwtToken=token;
    }
    // 檢查 turnstile 是否載入完成並手動渲染
    if ((/** @type {any} */ (window))['turnstile']) {
      (/** @type {any} */ (window))['turnstile'].render('.cf-turnstile');
    }
    console.log()
  });

  function back() {
    dispatch('login');
  }
  function pwdVisible(){
    showPwd=!showPwd;
  }
  async function enter() {
    if(!jwtToken){
      // document.getElementById('mes').style.color='#af1817';
      s='請先完成機器人驗證';
      return ;
    }

    try{
      // document.getElementById('mes').style.color='black';
      s="loading...";
      const result=await post('/register',JSON.stringify({"username":username,"password":password,"email":email,"captcha_token":jwtToken}),'application/json');
      // document.getElementById('mes').style.color='#18af17';
      s="註冊成功!";
      dispatch('signup');
    }catch(/** @type {any} */ err){
      // document.getElementById('mes').style.color='#af1817';
      if(username.length<4){
        s='帳號長度需大於4位';
      }else if(password.length<8){
        s='密碼長度需大於8位';
      }else{
        s=err.message;
      }
    }
  }
</script>

<div class="login-container">
  <button on:click={back} class="top-right-btn">Back</button>
  <h1>Sign Up</h1>
  <div class="login-form">
    <div class="inputs">
      <input
        type="text"
        bind:value={username}
        placeholder="帳號"
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
    <div class="inputs">
      <input
        type="text"
        bind:value={email}
        placeholder="Email"
        on:keydown={(e) => e.key === 'Enter' && enter()}
      />
    </div>
    <div class="cf-turnstile" data-sitekey="1x00000000000000000000AA" data-callback="verify"></div>
    <p id="mes" style:color={mesColor}>{s}</p>
      <button on:click={enter}>Enter</button>
  </div>
</div>

<style>
  .login-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    width: 100%;
  }
  .top-right-btn{
    margin: 30px 50px;
    display: flex;
    align-self: flex-end;
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
  .cf-turnstile{
    margin-top: 20px;
  }
</style>
