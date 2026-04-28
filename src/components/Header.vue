<script setup lang="ts">
</script>

<template>
<header class="header">
    <div class="container-xxl header__container">
        <RouterLink to="/" class="header__logo" aria-label="logo">
            <img
            class="header__logo-img"
            src="@/assets/logo.svg"
            alt="logo"
            />
        </RouterLink>

        <nav class="header__nav">
            <RouterLink  to="/" class="header__link" active-class="header__link--active">
            Home
            </RouterLink>

            <RouterLink to="/about" class="header__link" active-class="header__link--active">
            About
            </RouterLink>

            <RouterLink to="/time" class="header__link" active-class="header__link--active">
            Time
            </RouterLink>
        </nav>
    </div>
</header>
</template>

<style scoped lang="scss">
.header {
    padding: 1rem 0;
    background-color: $color-primary;
    color: $color-text;

    &__container {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    &__logo {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    &__logo-img {
        height: 3rem;
    }

    &__nav {
        display: flex;
        gap: 1.25rem;
    }

    &__link {
        font-weight: 500;
        text-decoration: none;
        color: $color-link;
        transition: color 0.3s;

        &:hover {
        color: $color-link-hover;
        }

        &--active {
        color: $color-link-active;
        font-weight: 700;
        }
    }
}

/* responsive */
@media (max-width: 768px) {
    .header {
        &__container {
            flex-direction: column;
            gap: 0.5rem;
        }
    }
}
</style>
