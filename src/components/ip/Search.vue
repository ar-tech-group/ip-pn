<script lang="ts" setup>
import { ref,watch } from 'vue';
import { ElInput } from 'element-plus';
import IconSearch from '@/assets/icons/icon-search.svg';

const emit = defineEmits(['update-value']);

const value = ref<string>('');

watch(value, (next) => {
    if (next.length <= 0) {
        emit('update-value', '');

        return;
    }

    emit('update-value', next);
});
</script>

<template>
    <div class="ip-search">
        <ElInput
            v-model="value"
            class="ip-search__inp"
            placeholder="Поиск по таблице..."
        >
            <template #prefix>
                <IconSearch
                    class="iip-search__inp-icon"
                />
            </template>
        </ElInput>
    </div>
</template>

<style lang="scss">
.ip-search {
    position: relative;
    margin-bottom: 20px;

    .el-input {
        width: 100%;
        max-width: 620px;
        height: 44px;

        &__wrapper {
            box-shadow: 0 0 0 1px var(--gray-lightests);
        }

        &__inner {
            font-size: 16px;
            font-weight: var(--f-weight-regular);
            line-height: 24px;
            color: var(--black-primary);

            &::placeholder {
                color: var(--gray-light);
            }
        }
    }
}
</style>
