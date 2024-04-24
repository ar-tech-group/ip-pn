<script lang="ts" setup>
import Logo from '@/components/common/Logo.vue';
import Search from '@/components/common/Search.vue';
</script>

<template>
    <header id="header" class="header">
        <nav class="menu">
            <div class="menu-container">
                <div class="menu-header">
                    <Logo />
                </div>

                <div class="menu-content">
                    <Search
                        class="menu-search"
                    />

                    <slot />
                </div>
            </div>
        </nav>
    </header>
</template>

<style lang="scss">
.header {
    position: fixed;
    top: 0;
    width: 100%;
    background-color: var(--white-darkest);
}

.menu {
    position: relative;
}

.menu-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: 1240px;
    margin: 0 auto;
    padding: 26px 0;
}

.menu-content {
    display: flex;
    align-items: center;
    width: 100%;
}

.menu-search {
    width: 100%;
    max-width: 460px;
    margin: 0 auto;
}
</style>
