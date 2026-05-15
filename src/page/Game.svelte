<script>
    import Rule from './Rule.svelte'; 
    import Timer from './../lib/countdown.svelte'
    import Piece from '../lib/piece.svelte';
    import Nameplate from '../lib/nameplate.svelte';

    let nowColor='#ED9E92';
    let showRules = false;
    function toggleRules() {
        showRules = !showRules;
    }
</script>

<div class="game-container">
    <div class="top">
        <Timer seconds={60} color={nowColor}/> <!-- 倒數計時，可傳倒數秒數跟背景顏色 -->

        <button on:click={toggleRules} class="rule-btn">Rule</button>
        {#if showRules}
            <Rule on:close={toggleRules} />
        {/if}
    </div>

    <Nameplate name="name1" color={nowColor}/> <!-- 名牌，可傳名字跟背景顏色 -->
    <Piece color={nowColor}/> <!-- 棋子，可傳背景顏色 -->
</div>

<style>
.game-container{
  display: flex;
  position: relative;
  text-align: center;
  flex-direction: column;
}

.top{
    display: flex;
    width: 100%;
    justify-content: center;
    flex-direction: row;
}

.rule-btn{
    position: absolute;    
    right: 20px;
    margin-top: 20px;
}
</style>