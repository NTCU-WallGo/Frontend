<script>
    export let name='Player';
    export let color='black';
</script>

<svg xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 200 60" 
    style="width: 200px; height: 60px;"
    class="name">
<rect 
    width="250" height="50" 
    fill="{color}" 
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