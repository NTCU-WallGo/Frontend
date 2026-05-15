<script>
    export let name = "Quoridor";
    $: letters = name.split('');
</script>

<div class="cross-jump-container">
    {#each letters as char, i}
        <span class="char {i % 2 === 0 ? 'odd' : 'even'}">
            {char === ' ' ? '\u00A0' : char}
        </span>
    {/each}
</div>

<style>
    .cross-jump-container {
        display: flex;
        justify-content: center;
        gap: 2px;
        font-size: 3rem;
        font-weight: bold;
        color: white;
        width: 200px;
    }

    .char {
        display: inline-block;
        animation-duration: 0.5s;
        animation-iteration-count: infinite;
        animation-direction: alternate;
        animation-timing-function: ease-in-out;
    }

    .cross-jump-container:hover .odd {
        animation-name: jump-up;
    }

    .cross-jump-container:hover .even {
        animation-name: jump-down;
    }

    @keyframes jump-up {
        from { transform: translateY(5px); }
        to { transform: translateY(-10px); }
    }

    @keyframes jump-down {
        from { transform: translateY(-10px); }
        to { transform: translateY(5px); }
    }
</style>