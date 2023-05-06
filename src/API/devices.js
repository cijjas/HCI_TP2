import { Api } from './api'


class DevicesApi{
    static getUrl(slug){
        return `${Api.baseUrl}/devices${ slug ? `/${slug}` : "" }`;
    }
    static add( device ){
        return Api.post(DevicesApi.getUrl(), device);
    }
    static modify(device){
        return Api.put(DevicesApi.getUrl(device.id), device);      // device seria el body
    }
    static remove(id){
        return Api.delete(DevicesApi.getUrl(id));
    }
    static get(id){
        return Api.get(DevicesApi.getUrl(id));
    }
    static getAll(){
        return Api.get(DevicesApi.getUrl());
    }
}


/*
controlar????
*/
export { DevicesApi }
