<script lang="ts" setup>
import { computed } from 'vue';
import { ElTable, ElTableColumn } from 'element-plus';
import type { IpItemDataType } from '@/types/Ip.ts';

const props = defineProps<{
    data: IpItemDataType;
}>();

const list = computed(() => [props.data]);
</script>

<template>
    <ElTable
        border
        :data="list"
    >
        <ElTableColumn prop="query" label="IP" />
        <ElTableColumn prop="status" label="Status" />
        <ElTableColumn prop="country" label="Country" />
        <ElTableColumn prop="countryCode" label="Country Code" />
        <ElTableColumn prop="region" label="Region" />
        <ElTableColumn prop="regionName" label="Region Name" />
        <ElTableColumn prop="city" label="City" />
        <ElTableColumn prop="zip" label="Zip" />
        <ElTableColumn prop="lat" label="Lat" />
        <ElTableColumn prop="lon" label="Lon" />
        <ElTableColumn prop="timezone" label="Timezone" />
        <ElTableColumn prop="isp" label="Isp" />
        <ElTableColumn prop="org" label="Org" />
        <ElTableColumn prop="as" label="As" />
    </ElTable>
</template>
