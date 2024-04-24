<script lang="ts" setup>
import { ref } from 'vue';
import { ElInput } from 'element-plus';
import debounce from 'lodash.debounce';
import IconSearch from '@/assets/icons/icon-search.svg';

const value = ref<string>('');

const enterValue = debounce((e) => {
    value.value = e;
}, 150);
</script>

<template>
    <div class="search">
        <form
            class="search-form"
            @submit.prevent
        >
            <ElInput
                v-model="value"
                placeholder="95.213.138.174"
                class="search-form__inp"
                @input="enterValue"
            >
                <template #prefix>
                    <IconSearch
                        class="search-form__inp-icon"
                    />
                </template>
            </ElInput>
        </form>
    </div>
</template>

<style lang="scss">
.search-form {
    .el-input {
        width: 100%;
        max-width: 460px;
        min-height: 48px;

        &__wrapper {
            box-shadow: 0 0 0 1px var(--gray-lightests);
        }

        &__inner {
            font-size: 16px;
            font-weight: var(--f-weight-regular);
            line-height: 24px;
            color: var(--black-primary);
        }
    }
}
</style>
