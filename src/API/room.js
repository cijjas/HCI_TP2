import { Api } from './api'


class RoomApi{
    static getUrl(slug){
        return `${Api.baseUrl}/rooms${ slug ? `/${slug}` : "" }`;
    }
    static add( room){
        return Api.post(RoomApi.getUrl(), room);
    }
    static modify(room){
        return Api.put(RoomApi.getUrl(room.id), room);      // room seria el body
    }
    static remove(id){
        return Api.delete(RoomApi.getUrl(id));
    }
    static get(id){
        return Api.get(RoomApi.getUrl(id));
    }
    static getAll(){
        return Api.get(RoomApi.getUrl());
    }
}

export { RoomApi }
