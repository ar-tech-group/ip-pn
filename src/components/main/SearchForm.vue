<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { ElInput, ElButton } from 'element-plus';
import { getIpInfo } from '@/api/ip.ts';
import { useIpStore } from '@/store/ip';
import type { IpItemDataType } from '@/types/Ip.ts';
import UiLoader from '@/components/ui/Loader.vue';

const router = useRouter();

const store = useIpStore();

const search = ref<string>('');
const isLoading = ref<boolean>(false);

/**
 * Форматируем данные под нужный вид.
 */
const formattedData = () => {
    return search.value.split('\n').filter(item => item.trim() !== '');
};

/**
 * Отправка данных на сервер.
 */
const sendData = () => {
    isLoading.value = true;

    formattedData().forEach(item => {
        getIpInfo(item)
            .then((data: IpItemDataType) => {
                store.addItem({
                    ...data,
                    checked: false,
                });

                router.replace({ name: 'ip' });
            })
            .catch(error => console.warn(error))
            .finally(() => {
                isLoading.value = false;
            });
    });
};
</script>

<template>
    <form
        class="main-search-form"
        @submit.prevent
    >
        <ElInput
            v-model="search"
            type="textarea"
            placeholder="Введите IP адреса"
        />

        <ElButton
            :loading="isLoading"
            @click="sendData"
        >
            <template #loading>
                <UiLoader
                    v-if="isLoading"
                    color="blue-primary"
                />
            </template>

            Отправить
        </ElButton>
    </form>
</template>

<style lang="scss">
.main-search-form {
    position: relative;
    display: flex;
    flex-direction: column;

    .el-textarea {
        width: 100%;
        max-width: 620px;
        margin-bottom: 20px;

        &__inner {
            min-height: 112px !important;
            padding: 12px;
            font-size: 16px;
            font-weight: var(--f-weight-regular);
            line-height: 24px;
            color: var(--black-primary);
        }

        textarea::placeholder {
            color: var(--gray-light);
        }
    }

    .el-button {
        width: 100%;
        max-width: 125px;
        height: 48px;
        font-size: 16px;
        font-weight: var(--f-weight-regular);
        line-height: 24px;
        border: none;
        background-color: var(--white-darkest);
        color: var(--black-primary);

        &:hover,
        &:active {
            background-color: var(--white-darkest);
            color: var(--black-primary);
        }

        .ui-loader {
            position: absolute;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            background-color: var(--white-darkest);
        }
    }
}
</style>
