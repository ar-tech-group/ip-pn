<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getIpInfo } from '@/api/ip.ts';
import type { IpItemDataType } from '@/types/Ip.ts';
import IpDetailTable from '@/components/ip/details/Table.vue';
import Container from '@/components/ui/Container.vue';
import UiIcon from '@/components/ui/Icon.vue';

const router = useRouter();

const dataIp = ref<IpItemDataType | null>(null);

const getIp = computed(() => {
    return router.currentRoute.value.path.split('/ip/')[1];
});

onMounted(() => {
    getIpInfo(getIp.value)
        .then((data: IpItemDataType) => {
            dataIp.value = data;
        })
        .catch(error => console.warn(error));
});
</script>

<template>
    <div class="ip-detail-page">
        <Container>
            <div class="ip-detail-page-header">
                <UiIcon
                    :name="String(dataIp?.country.replace(/\s/g, ''))"
                />

                <p>
                    {{ dataIp?.country }}
                </p>
            </div>

            <IpDetailTable
                v-if="dataIp"
                :data="dataIp"
            />
        </Container>
    </div>
</template>

<style lang="scss">
.ip-detail-page {
    position: relative;
}

.ip-detail-page-header {
    display: flex;
    align-items: center;
    gap: 24px;
    margin-bottom: 20px;
}
</style>
