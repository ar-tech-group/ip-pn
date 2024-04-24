<script lang="ts" setup>
import { onMounted } from 'vue';
import Cookies from 'js-cookie';
import debounce from 'lodash.debounce';
import { useIpStore } from '@/store/ip';
import IpSearch from '@/components/ip/Search.vue';
import IpTable from '@/components/ip/Table.vue';
import Container from '@/components/ui/Container.vue';

const store = useIpStore();

/**
 * Обработчик ввода в поле поиска.
 */
const enterValue = debounce((e) => {
    store.filteredSearch(e);
}, 200);

onMounted(() => {
    const data = Cookies.get('ip-data');

    if (data && store.list.length <= 0) {
        store.set(JSON.parse(String(data)));
    }
});
</script>

<template>
    <div class="ip-page">
        <Container>
            <IpSearch
                @update-value="enterValue"
            />

            <IpTable
                :data="store.list"
            />
        </Container>
    </div>
</template>

<style lang="scss">
.ip-page {
    position: relative;
}
</style>
