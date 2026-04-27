<script setup lang="ts">
 defineProps(['recipe'])
 import RecipeCardImage from './RecipeCardImage.vue'
</script>

<template>
  <div class="recipe-card">
    <RecipeCardImage :recipe="recipe"/>
    <div class="quickview">
      <h1>{{ recipe.title }}</h1>
      <div class="details">
        <p>{{ recipe.minutes }} minutes</p>
        <p>Serves {{ recipe.serves }}</p>
        <p>{{ recipe.ingredients.length }} key ingredients</p>
      </div>
      <div class="actions">
        <button>
          View
        </button>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none"><path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill="currentColor" d="M6.046 11.677A7.5 7.5 0 0 1 20 15.5a1 1 0 1 0 2 0A9.5 9.5 0 0 0 4.78 9.963l-.537-3.045a1 1 0 1 0-1.97.347l1.042 5.909a1 1 0 0 0 .412.645a1.1 1.1 0 0 0 .975.125l5.68-1.001a1 1 0 1 0-.347-1.97z"/></g></svg>
      </div>
    </div>
  </div>
</template>

<style scoped>
.recipe-card {
  border-radius: 0.5rem;
  box-shadow: 0 0 0.25rem #ddd;
  padding: 1rem;
  text-align: center;
}

.recipe-card .quickview {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.recipe-card .quickview h1 {
  font-size:1.3rem;
}

.recipe-card .quickview .actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-grow: 1;
}
.recipe-card .quickview .actions svg {
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
}

.recipe-card .quickview .actions svg:hover {
  transform: scale(1.1);
}

.recipe-card img {
  aspect-ratio: 1/1;
  width: 100%;
  border-radius: 0.5rem;
  cursor: pointer;
  opacity: 0.9;
  transition: opacity 0.2s;
}
.recipe-card img:hover{ 
  opacity: 1;
}
</style>
