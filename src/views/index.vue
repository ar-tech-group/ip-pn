<script lang="ts" setup>
import SearchForm from '@/components/main/SearchForm.vue';
import Container from '@/components/ui/Container.vue';
</script>

<template>
    <div class="main-page">
        <Container>
            <SearchForm />
        </Container>
    </div>
</template>

<style lang="scss">
.main-page {
    position: relative;
}
</style>
