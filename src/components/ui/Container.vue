<script lang="ts" setup></script>

<template>
    <div class="container">
        <slot />
    </div>
</template>

<style lang="scss">
.container {
    max-width: 100%;
    margin: 0 auto;

    @media (width >= 1200px) {
        max-width: 1240px;
    }
}
</style>
