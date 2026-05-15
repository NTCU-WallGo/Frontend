<!-- game裡面倒數計時 -->
<script>
    import { createEventDispatcher, onMount, onDestroy } from 'svelte';

    const dispatch=createEventDispatcher();
    export let seconds=90;
    export let color='black';
    $: displayMinute=Math.floor(seconds/60).toString().padStart(2, '0');
    $: displaySeconds=(seconds%60).toString().padStart(2, '0');
    /** @type {number | null} */
    let timer=null;

    function startTimer(){
        timer=setInterval(()=>{
            if(seconds>0){
                seconds-=1;
            }else{
                stopTimer();
                dispatch('timeout');
            }
        },1000);
    }

    function stopTimer(){
        if(timer){
            clearInterval(timer);
        }
        timer=null;
    }

    onMount(()=>{
        startTimer();
    })

    onDestroy(()=>{
        stopTimer();
    })
</script>

<div class="countdown-display" style:background-color={color}>
  <span class={seconds <= 10 ? 'warning' : ''}>
    {displayMinute}:{displaySeconds}
  </span>
</div>

<style>
.countdown-display{
    display: flex;
    color: white;
    background-color: color;
    width: 200px;
    height: 50px;
    justify-content: center;
    align-items: center;
    font-size: 30px;
    margin: 30px;
}

.warning {
    color: #af1817;
    animation: blink 1s infinite;
}
@keyframes blink {
    50% { opacity: 0.5; }
}
</style>