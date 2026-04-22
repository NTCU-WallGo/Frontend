<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  function handleClick() {
    dispatch('backToHome');
  }
</script>

<div class="back-layer">
  <button on:click={handleClick} class="back-btn">
    Home
  </button>
</div>

<style>
  .back-layer {
    position: fixed;
    top: 20px;
    left: 20px;
    z-index: 1000;
  }

  .back-btn {
    padding: 10px 20px;
    background-color: #4a4a4a;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  }

  .back-btn:hover {
    background-color: #666;
  }
</style>