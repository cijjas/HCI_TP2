import { Api } from './api'


class RoutinesApi{
    static getUrl(slug){
        return `${Api.baseUrl}/routines${ slug ? `/${slug}` : "" }`;
    }
    static add(routine){
        return Api.post(RoutinesApi.getUrl(), routine);
    }
    static modify(routine){
        return Api.put(RoutinesApi.getUrl(routine.id), routine);      // routine seria el body
    }
    static remove(id){
        return Api.delete(RoutinesApi.getUrl(id));
    }
    static get(id){
        return Api.get(RoutinesApi.getUrl(id));
    }
    static getAll(){
        return Api.get(RoutinesApi.getUrl());
    }
    static execute(id){
        return Api.put(RoutinesApi.getUrl(id+'/execute'));
    }
}

/*
execute????
*/

export { RoutinesApi }
