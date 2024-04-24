<script lang="ts" setup>
import { ref, computed, watch } from 'vue';
import {
    ElTable,
    ElTableColumn,
    ElIcon,
    ElButton,
    ElPopover,
    ElSelect,
    ElOptionGroup,
    ElOption,
} from 'element-plus';
import { useIpStore } from '@/store/ip.ts';
import { options } from '@/constants/table.ts';
import type { IpItemModifyType } from '@/types/Ip.ts';
import UiIcon from '@/components/ui/Icon.vue';
import IconTrash from '@/assets/icons/icon-trash.svg';
import IconCopy from '@/assets/icons/icon-copy.svg';
import IconSuccess from '@/assets/icons/status/icon-success.svg';
import IconPending from '@/assets/icons/status/icon-pending.svg';
import IconFail from '@/assets/icons/status/icon-fail.svg';

const props = defineProps<{
    data: IpItemModifyType[];
}>();

const store = useIpStore();

const sorted = ref<string>('');
const isSelected = ref<IpItemModifyType[]>([]);
const isClearable = ref<boolean>(false);

const list = computed(() => props.data);

/**
 * Копируем данные.
 *
 * @param {string} data
 */
const copyData = (data: string) => {
    navigator.clipboard.writeText(data);
};

/**
 * Обработчик клика на чекбокс.
 */
const handleSelectionChange = (value: IpItemModifyType[]) => {
    isSelected.value = value;

    store.setIsChecked(value);

    isClearable.value = true;
};

watch(sorted, (next) => {
    if (next.length <= 0) return;

    store.sorted(next);
});
</script>

<template>
    <div class="ip-table">
        <ElButton
            v-if="isClearable"
            type="danger"
            @click="store.removeItemSelected(isSelected)"
        >
            Удалить выбранные
        </ElButton>

        <ElSelect
            v-model="sorted"
            placeholder="A-Z"
            width="64"
            class-name="ip-table__column-country-select"
        >
            <ElOptionGroup
                v-for="group in options"
                :key="group.label"
                :label="group.label"
            >
                <ElOption
                    v-for="item in group.options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                />
            </ElOptionGroup>
        </ElSelect>

        <ElTable
            border
            stripe
            :data="list"
            height="336px"
            @selection-change="handleSelectionChange"
        >
            <ElTableColumn type="selection" width="48" />

            <ElTableColumn
                label="IP"
                width="300"
            >
                <template #default="data">
                    <ElIcon>
                        <UiIcon
                            :name="String(data.row.country).replace(/\s/g, '')"
                        />
                    </ElIcon>

                    {{ data.row.query }}

                    <ElButton
                        v-if="data.row.checked"
                        @click="store.remove(data.row.query)"
                    >
                        <IconTrash />
                    </ElButton>

                    <ElButton
                        v-else
                        class="el-table__btn-copy"
                        @click="copyData(JSON.stringify(data.row))"
                    >
                        <IconCopy />
                    </ElButton>
                </template>
            </ElTableColumn>

            <ElTableColumn
                label="Country"
                width="414"
                class-name="el-table__column-country"
            >
                <template #default="data">
                    {{ data.row.country }}
                </template>
            </ElTableColumn>

            <ElTableColumn
                label="City/Town"
                width="430"
            >
                <template #default="data">
                    {{ data.row.city }}
                </template>
            </ElTableColumn>

            <ElTableColumn
                label=""
                width="48"
            >
                <template #default="data">
                    <ElPopover
                        trigger="hover"
                        placement="top"
                        width="95"
                    >
                        <template #default>
                            {{ data.row.status === 'success'
                                ? 'Успешно'
                                : (data.rows.status === 'fail' ? 'Не успешно' : 'В процессе')
                            }}
                        </template>

                        <template #reference>
                            <el-tag
                                :class="{
                                    [`el-tag--${data.row.status}`]: data.row.status,
                                }"
                            >
                                <IconSuccess
                                    v-if="data.row.status === 'success'"
                                />

                                <IconFail
                                    v-else-if="data.row.status === 'fail'"
                                />

                                <IconPending
                                    v-else
                                />
                            </el-tag>
                        </template>
                    </ElPopover>
                </template>
            </ElTableColumn>
        </ElTable>
    </div>
</template>

<style lang="scss">
.ip-table {
    position: relative;
    height: 336px;

    .el-button {
        &--danger {
            position: absolute;
            top: 3%;
            left: 15%;
            width: 100%;
            max-width: 147px;
            font-size: 13px;
            font-weight: var(--f-weight-medium);
            line-height: 20px;
            border: none;
            transform: translateY(-3%);
            background: var(--payed-red);
            color: var(--red);
            z-index: 99;
        }
    }

    .el-select {
        position: absolute;
        top: 3%;
        left: 55%;
        width: 100%;
        max-width: 64px;
        transform: translateY(-3);
        z-index: 99;

        &__wrapper {
            background: var(--white-darkest);

            &.is-focused {
                .el-select {
                    &__placeholder {
                        color: var(--blue);
                    }
                }
            }
        }

        &__placeholder {
            width: 28px !important;
            font-size: 13px;
            font-weight: var(--f-weight-medium);
            line-height: 20px;
            text-overflow: initial;
        }
    }

    .el-table {
        .el-table_1_column_1 {
            display: flex;
            align-items: center;
            justify-content: center;
        }

        th.el-table__cell {
            &.is-leaf {
                border-bottom: 1px solid var(--white-lightests) !important;
            }
        }

        &__row {
            cursor: pointer;

            .el-table__btn-copy {
                opacity: 0;
                transition: opacity 0.5s ease;
            }

            .el-table_1_column_2 {
                .el-icon {
                    width: 21px;
                    height: 15px;
                }

                .cell {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-size: 16px;
                    font-weight: var(--f-weight-regular);
                    line-height: 24px;
                    color: var(--black-primary);

                    .el-button {
                        width: 36px !important;
                        height: 36px !important;
                        margin-left: auto !important;
                        border: none !important;
                        background-color: transparent !important;

                    }
                }
            }

            .el-table_1_column_5 {
                padding:  0 !important;

                .cell {
                    padding: 0;
                }
            }

            &:hover {
                .el-table__btn-copy {
                    opacity: 1;
                }
            }
        }

        &__cell {
            width: 48px !important;
            height: 48px !important;
            padding: 4px 0 !important;
            border-right: 1px solid var(--white-lightests) !important;
            color: var(--black-primary);

            .el-checkbox {
                width: 20px;
                height: 20px !important;

                &__input {
                    &.is-checked {
                        .el-checkbox__inner {
                            border-color: var(--blue);
                            background-color: var(--blue);
                        }
                    }
                }

                &__inner {
                    width: 20px;
                    height: 20px;
                    border-radius: var(--radius);

                    &::after {
                        top: 4px;
                        left: 6px;
                        border: 2px solid transparent;
                        border-left: 0;
                        border-top: 0;
                    }
                }
            }
        }

        &--border {
            border-radius: var(--radius);
            border: 1px solid var(--white-lightests);
            overflow: hidden;
        }
    }

    .el-tag {
        width: 48px;
        min-height: 48px;
        padding: 0;
        background: transparent;
        transition: background 0.3s ease;

        &--success {
            &:hover {
                background: var(--payed-green);
            }
        }
    }
}

.el-select__popper {
    .el-popper__arrow {
        display: none;
    }
}

.el-popover.el-popper {
    min-width: 95px !important;
    font-size: 12px !important;
    font-weight: var(--f-weight-regular) !important;
    line-height: 16px !important;
    text-align: center !important;
    color: var(--black-primary) !important;
}

.el-select-dropdown {
    &__list {
        padding: 0 !important;
    }

    &__item {
        display: flex;
        align-items: center;
        height: 24px !important;
        padding: 5px 4px !important;
        font-weight: var(--f-weight-medium) !important;
        color: var(--grat-darkest);

        &.is-hovering,
        &.is-selected {
            background-color: var(--payed-blue) !important;
            color: var(--blue) !important;
        }
    }
}

.el-select-group {
    &__wrap {
        border-radius: var(--radius);
        border: 1px solid var(--white-lightests);
    }

    &__title {
        padding: 5px 4px !important;
        font-size: 13px !important;
        line-height: 13px !important;
        color: var(--gray-darker) !important;
    }
}
</style>
