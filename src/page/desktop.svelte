<script>
  import { createEventDispatcher } from 'svelte';
  import Title from '../lib/title.svelte';
  export let username = undefined;
  export let isLogin;

  let roomNumber = '';
  const dispatch = createEventDispatcher();

  function handleLogin() {
    dispatch('login');
  }

  function handleLogout() {
    dispatch('logout');
  }

  function generateRandomRoom() {
    const randomId = Math.random().toString(36).substring(2, 8).toUpperCase();
    roomNumber = randomId;
    dispatch('room', { roomId: randomId });
  }


</script>
<div class="login-container">
  <!-- 沒有username時顯示login  有時顯示logout -->
  {#if !isLogin} 
    <button on:click={handleLogin} class="top-right-btn">login</button>
  {:else}
    <div class="logbox">
      <p class="mes">Welcome {username}!</p>
      <button on:click={handleLogout} class="top-right-btn">logout</button>
    </div>
  {/if}
  <div class="login-box">
    <h1 class="title"><Title/></h1>
    
    <div  class="input-group">
      <input
        id="room-input"
        type="text"
        bind:value={roomNumber}
        placeholder="enter room id"
      />
      <button  class="join-btn">
        join
      </button>
    </div>

    <button on:click={generateRandomRoom} class="create-btn">
      create
    </button>
  </div>
</div>

<style>
.login-container{
  display: flex;
  margin: 0 auto;
  text-align: center;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.top-right-btn{
  margin: 30px 50px;
  display: flex;
  align-self: flex-end;
}
.logbox{
  display: flex;
  width: 100%;
}
.title {
  display: flex;
  font-size: 3rem;
  color: white;
  width: 600px;
  margin-bottom: 70px;
  background-color: #9B9B9B;
  border-radius: 0.5rem;
  padding: 1rem;
  justify-content: center;
}
#room-input{
  width: 400px;
}
.login-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100vh;
}
.input-group {
  gap: 10px;
}
.create-btn{
  display: flex;
  width: 100px;
  align-items: center;
  justify-content: center;
}
.mes{
  margin-right: auto;
}
</style>