<script setup lang="ts">
import RecipeCard from './components/RecipeCard.vue';
import recipes from './assets/data.ts'
</script>

<template>
<section class="recipe__section">
    <div class="container-xxl recipe__container">
        <RecipeCard v-for="recipe in recipes" :recipe/>
    </div>
</section>
</template>

<style scoped lang="scss">
.recipe__section {
    padding: 2rem 0;

    .recipe__container {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 1rem;
    }
}

@media (max-width: 1200px) {
    .recipe__container {
        grid-template-columns: repeat(2, 1fr);
    }
}
</style>
