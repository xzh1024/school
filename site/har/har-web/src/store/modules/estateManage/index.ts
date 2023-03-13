import { defineStore } from 'pinia';

export type EditForm = {
    id?: number;
    projectId?: string;
    buildingId?: string;
    floorIds?: number[];
    Berths?: number[];
    deviceType?: string | number;
    deviceCode?: string;
    deviceName?: string;
    isIntellectDevice?: number;
    costProjectId?: number;
    magnification?: number;
    maxReadNum?: number | undefined;
    LossRate?: number | undefined;
    lastDate?: string | Date;
    currentReadNum?: number | undefined;
    unitPrice?: number;
    isCludeRate?: string | number;
    taxRate?: number | undefined;
    hardwareCode?: string;
    brand?: string;
};
export type recordEditForm = {
    id?: number;
    projectId?: string;
    buildingId?: string;
    floorId?: number | string;
    deviceType?: string | number;
    deviceCode?: string;
    lastDate?: string | Date;
    lastReadNum?: number | string;
    lastUnitPrice?: number;
    currentDate?: string | Date;
    currentReadNum?: number | undefined;
    unitPrice?: number;
};

const useEstateManageStore = defineStore('estateManage', {
    state: () => ({
        lastTimeSubmitFormData: {} as EditForm,
        lastTiemRecordSubmitFormData: {} as recordEditForm
    }),
    actions: {
        setFormData(formData: EditForm) {
            this.lastTimeSubmitFormData = formData;
            sessionStorage.setItem('lastTimeSubmitFormData', JSON.stringify(this.lastTimeSubmitFormData))
        },
        setRecordFormData(formData: recordEditForm) {
            this.lastTiemRecordSubmitFormData = formData;
            sessionStorage.setItem('lastTimeSubmitRecordFormData', JSON.stringify(this.lastTiemRecordSubmitFormData))
        }
    }
});

export default useEstateManageStore;
