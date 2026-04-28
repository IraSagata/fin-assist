<script setup lang="ts">
defineProps(['recipe'])
</script>

<template>
<img v-bind:src="'/photos/' + recipe.image"/>
</template>

<style scoped lang="scss">
img {
    aspect-ratio: 1/1;
    width: 100%;
    border-radius: 5px;
    cursor: pointer;
    opacity: 0.9;
    transition: opacity 0.2s;
}

img:hover {
    opacity: 1;
}
</style>
