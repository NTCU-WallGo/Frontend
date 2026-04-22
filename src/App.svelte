<script>
  import { onMount } from 'svelte';
  import { authStore, logout, getusername } from './lib/auth.js';
  import Login from './page/Login.svelte';
  import Room from './page/Room.svelte';
  import Desktop from './page/desktop.svelte';  
  import Signup from './page/Signup.svelte';
  import DesktopButton from './lib/desktop_button.svelte';
  import Forget from './page/Forget.svelte';

  let currentPage = 'desktop';
  let roomId = '';
  
  onMount(() => {
    window.addEventListener('token_expired', () => {
      alert('登入已過期，請重新登入');
      currentPage = 'login';
    });
    if (localStorage.getItem('token'))
      getusername();
  
    // 全域禁用拼寫檢查紅線
    const handleFocus = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        e.target.setAttribute('spellcheck', 'false');
      }
    };
    window.addEventListener('focusin', handleFocus);

    // 初始檢查
    if (localStorage.getItem('token')) getusername();

    // 組件銷毀時移除監聽器
    return () => {
      window.removeEventListener('focusin', handleFocus);
    };
    });

  function handleLogin() {
    currentPage = 'login';
  }
  function handleSignup() {
    currentPage = 'signup';
  }
  function handleRoom(event) {
    roomId = event.detail.roomId;
    currentPage = 'room';
  }

  function handleLogout() { // 登出
    currentPage = 'desktop';
    logout();
  }

  function handleHome() { // 返回主畫面
    currentPage = 'desktop';
    roomId = '';
  }

  function handleForget() {
    currentPage = 'forget';
  }
</script>

{#if currentPage !== 'desktop'}
  <DesktopButton on:backToHome={handleHome} />
{/if}

{#if currentPage === 'desktop'}
  <Desktop 
    username={$authStore.user} 
    isLogin={$authStore.isLogin} 
    on:login={handleLogin} 
    on:room={handleRoom} 
    on:logout={handleLogout}
  /> 
{:else if currentPage === 'login'}
  <Login on:login={handleHome} on:signup={handleSignup} on:desktop={handleHome} on:forget={handleForget}/>
{:else if currentPage === 'signup'}
  <Signup on:signup={handleHome} on:login={handleLogin}/>
{:else if currentPage === 'room'}
  <Room {roomId} on:logout={handleHome} />
{/if}

<style>

</style>