<script>
  import { createEventDispatcher } from 'svelte';
  import Rule from './Rule.svelte'; 
  import People from '../lib/player.svelte'

  export let roomId = '';
  let players=['aaaa','bbbb','cccc','dddd']; //舉例用的，還不確定要怎麼用:(
  const colors=["#ED9E92","#99E884","#81BDD5","#AF7ED2"]; 
  const dispatch = createEventDispatcher();

  let showRules = false;

  // function handleLogout() {
  //   dispatch('logout');
  // }
  function handleStart() {
    dispatch('game');
  }

  function toggleRules() {
    showRules = !showRules;
  }
</script>

<div class="room-container">
  <div class="header">
    <h2>room: {roomId}</h2>
  </div>
  <div class="player">
    {#each players as player,i(i)}
      <div style="color:{colors[i]}">
        <People name={player} />
      </div>
    {/each}
  </div>
  <div class="btn">
    <!-- <button on:click={handleLogout} class="back-btn">Back</button> -->
    <button on:click={toggleRules} class="rule-btn">Rule</button>
    <button on:click={handleStart} class="start-btn">Start</button>
  </div>

  {#if showRules}
    <Rule on:close={toggleRules} />
  {/if}
</div>

<style>
.room-container {
  position: relative;
  height: 90vh;
  display: flex;
  flex-direction: column;
}

.header {
  display: flex;
  font-size: 25px;
  height: 30px;
  align-items: center;
  justify-content: flex-end;
  padding: 30px;  
}

.player{
  display: flex;
  flex-direction: row;
  gap: 15%;
  justify-content: center;
  margin-top: 100px;
}

.btn{
  display: flex;
  align-items: center;
  justify-content: right;
  margin-top: auto;
  margin-bottom: 30px;
  margin-right: 210px;
  gap: 30%;
  cursor: pointer;
}

.rule-btn{
  background-color: #6e6e6e;
}
</style>
