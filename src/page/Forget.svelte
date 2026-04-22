<script>
  import { post } from '../api/api.js';
  let email = "";
  let message = "";
  let loading = false;

  async function handleForget() {
    loading = true;
    try {
      await post('/forgot-password', JSON.stringify({ email }), 'application/json');
      message = "重設信件已寄出";
    } catch (err) {
      message = err.message; 
    } finally {
      loading = false;
    }
  }
</script>

<main>
  <h2>Forgot password</h2>
  <input type="email" bind:value={email} placeholder="Please enter your registered Email" />
  <button on:click={handleForget} disabled={loading}>
    {loading ? "Sending..." : "Send Reset Link"}
  </button>
  {#if message}<p>{message}</p>{/if}
</main>