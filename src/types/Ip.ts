export type IpItemDataType = {
    query: string;
    status: string;
    country: string;
    countryCode: string;
    region: string;
    regionName: string;
    city: string;
    zip: string;
    lat: number;
    lon: number;
    timezone: string;
    isp: string;
    org: string;
    as: string;
};

export type IpItemModifyType = IpItemDataType & {
    checked: false;
};
