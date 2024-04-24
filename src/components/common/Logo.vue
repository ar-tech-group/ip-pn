<script lang="ts" setup>
import IconLogo from '@/assets/icons/icon-logo.svg';
</script>

<template>
    <router-link
        to="/"
        class="logo__link logo"
    >
        <IconLogo
            class="logo__icon"
        />
    </router-link>
</template>

<style lang="scss">
.logo {
    display: flex;

    &__link {
        text-decoration: none;
    }

    &__icon {
        width: 130px;
    }
}
</style>
