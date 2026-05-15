<!-- room裡面人的頭像及名稱 -->
<script>
    export let name = "Player";
</script>

<div class="icon">
    <svg xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor"
        stroke-width=1.5
        stroke-linecap="round" 
        stroke-linejoin="round"
        style="width: 200px; height: 200px;"
        class="people">
    <circle cx="12" cy="7" r="4"></circle>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2H20"></path>
    </svg>

    <svg xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 200 60" 
        style="width: 200px; height: 60px;"
        class="name">
    <rect 
        width="250" height="50" 
        fill="currentColor" 
        stroke=none stroke-width="2" />

    <text x="100" y="25" 
        font-family="Londrina Solid" 
        font-size="30" 
        font-weight="bold"
        fill="white" 
        text-anchor="middle" 
        dominant-baseline="central"
        class="jersey-25-regular">
        {name}
    </text>
    </svg>
</div>

<style>
    .icon{
        display: flex;
        flex-direction: column; 
        align-items: center;   
        width: 100px;          
    }
</style>

