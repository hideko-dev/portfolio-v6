<script>
    export let title;
    export let customStyle;
</script>

<div class="title" style={customStyle}>
    <p class="titles">{title}</p>
</div>

<style>
    .title {
        display: flex;
        align-items: center;
        font-family: 'Inter', sans-serif;
        font-weight: 700;
        font-size: 25px;
        gap: 4px;
    }
    .titles {
        transition: all 0.2s;
    }
</style>