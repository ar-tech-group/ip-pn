import { AxiosResponse } from 'axios';
import axios from '@/helpers/axios';
import type { IpItemDataType } from '@/types/Ip.ts';

/**
 * Получить информацию об ip.
 *
 * @param {string} ip - ip адресс
 */
export const getIpInfo = (ip: string): Promise<IpItemDataType> => (
    axios.get(`/json/${ip}`)
        .then(({ data }: AxiosResponse<IpItemDataType>): IpItemDataType => data)
);
