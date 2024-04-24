import {ref} from 'vue';
import {acceptHMRUpdate, defineStore} from 'pinia';
import Cookies from 'js-cookie';
import type {IpItemModifyType} from '@/types/Ip.ts';

/**
 * Store для работы с ip.
 */
export const useIpStore = defineStore('ip', () => {
    const list = ref<IpItemModifyType[]>([]);

    /**
     * Добавить новый объект с данными ip в массив.
     *
     * @param {Object<IpItemModifyType>} item
     */
    const addItem = (item: IpItemModifyType) => {
        list.value.push(item);

        Cookies.set('ip-data', JSON.stringify(list.value));
    };

    /**
     * Устанавливаем список добавленных ip адресов.
     *
     * @param {Array<IpItemModifyType>} data
     */
    const set = (data: IpItemModifyType[]) => {
        list.value = data;
    };

    /**
     * Удалить из ip из списка.
     *
     * @param {string} query - ip адрес
     */
    const remove = (query: string) => {
        list.value = list.value.filter(item => item.query !== query);

        Cookies.set('ip-data', JSON.stringify(list.value));
    };

    /**
     * Устанвливаем значение checked
     *
     * @param {IpItemModifyType[]} data
     */
    const setIsChecked = (data: IpItemModifyType[]) => {
        list.value = list.value.map(item => {
            data.forEach(el => {
                if (item.query === el.query) {
                    item.checked = true;
                }
            });

            return {...item};
        });
    };

    /**
     * Сортируем массив данных.
     *
     * @param {string} sort
     */
    const sorted = (sort: string) => {
        let newList;

        if (sort === 'A-Z') {
            newList = list.value.sort((a, b) => a.country.localeCompare(b.country));

            list.value = newList;

            return;
        }

        newList = list.value.sort((a, b) => b.country.localeCompare(a.country));

        list.value = newList;
    };

    /**
     * Удалить выделенные ээлементы.
     *
     * @param {IpItemModifyType[]} data
     */
    const removeItemSelected = (data: IpItemModifyType[]) => {
        list.value = list.value.filter(item => {
            return !data.some(el => el.query === item.query);
        });

        Cookies.set('ip-data', JSON.stringify(list.value));
    };

    /**
     * Фильтруем данные по поиску.
     *
     * @param {string} query
     */
    const filteredSearch = (query: string) => {
        const data = ref([...list.value]);

        if (query.length <= 0) {
            list.value = data.value;

            return;
        }

        list.value = list.value.filter(item => {
            return (
                item.query.toLowerCase().includes(query.toLowerCase()) ||
                item.country.toLowerCase().includes(query.toLowerCase()) ||
                item.city.toLowerCase().includes(query.toLowerCase())
            );
        });
    };

    return {
        list,
        addItem,
        set,
        remove,
        setIsChecked,
        sorted,
        removeItemSelected,
        filteredSearch,
    };
});

// для работы HMR
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useIpStore, import.meta.hot));
}
