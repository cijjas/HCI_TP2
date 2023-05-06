/*
Manejo directo con la API, con uso de headers, body y transiciones entre JSON y Strings
*/


class Api {
    static get baseUrl(){
        return "http://localhost:8080/api";
    }

    static async fetchApi( url, init = {}){
        try {
            const response = await fetch(url, init);  // llamado no bloqueante
            const text = await response.text();       // transformo el JSON en String
            const json = JSON.parse(text);      // lo transformo en un objeto
            return json.result
            // return JSON.parse(fetch(url, init)text()).result
        }catch( error ){
            console.log(error);
            console.log("Ouch");
        }
    }

    static get(url){
        return Api.fetchApi(url);                      // fetch por default hace get
    }

    static post(url, data){
        return Api.fetchApi(url, {
            method : "POST",
            headers : {
                "Content-Type" : "application/json; charset=utf-8"
            },
            body : JSON.stringify(data)
        });
    }

    static put(url, data){
        return Api.fetchApi(url, {
            method : "PUT",
            headers : {
                "Content-Type" : "application/json; charset=utf-8"
            },
            body : JSON.stringify(data)
        });
    }

    static delete(url){
        return Api.fetchApi(url, {
            method : "DELETE",
        });
    }
}

export { Api }
