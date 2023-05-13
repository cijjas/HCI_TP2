// Utilities
import { defineStore } from 'pinia'


import { removeItemFromArray } from '@/Lib/lib.js'
import { getIdByName } from '@/Lib/lib.js'


import { DevicesApi } from '@/API/devices';
import { RoomApi } from '@/API/room.js';
import { RoutinesApi } from '@/API/routines';

import SpeakerBox from '@/components/DeviceComponents/SpeakerBox.vue';
import CurtainBox from '@/components/DeviceComponents/CurtainBox.vue';
import TapBox from '@/components/DeviceComponents/TapBox.vue';
import FridgeBox from '@/components/DeviceComponents/FridgeBox.vue';
import OvenBox from '@/components/DeviceComponents/OvenBox.vue';
import { Api } from '@/API/api';

/*



*/


export const useAppStore = defineStore('app', {
  state: () => ({
    rooms : [],
    routines : [],
    devices : [],
    deviceActionsRaw : [],
    deviceActions : [],
    playlist :[],
    // speaker, oven, fridge, curtain, tap/sprinkler

    // STATIC API DATA

    supportedDevices : [{
      id: "eu0v2xgprrhhg41g",
      name: "Blinds"
      },{
      id: "im77xxyulpegfmv8",
      name: "Oven"
      },{
      id: "c89b94e8581855bc",
      name: "Speaker"
      },{
      id: "rnizejqr2di0okho",
      name: "Refrigerator"
      },{
      id: "dbrlsh7o5sn8ur4i",
      name: "Faucet"
    }],
    supportedDevicesNames : [ "blinds","oven" ,"speaker" , "refrigerator", "faucet"]
  }),


  actions :{
    /* -------------------------------------------------- ROOMS -------------------------------------------------- */
    getAllRooms(){
      return this.rooms;
    },
    async getAllRoomsAPI() {
      try {
        var result = await RoomApi.getAll();
        this.rooms = result;
        return result;
      } catch (error) {
        console.error(error);
      }
    },
    getARoom(id){
      return this.rooms.find( room => room.id == id);
    },
    getARoomByName(name){
      var roomId = getIdByName(this.rooms, name);
      return this.getARoom(roomId);
    },
    getRoomId(name){
      return getIdByName(this.rooms, name);
    },

    async createARoom(roomName){
      try {
        var roomObj = {
          name : roomName,
          meta : {
            devices : []
          }
        }
        var result = await RoomApi.add(roomObj);
        this.rooms.push(result);
        return result;
      } catch (error) {
        console.error(error);
      }
    },



    async updateARoom(id, newname){
      try {
        var roomObj = {
          id : id,
          name : newname,
          meta : {
            devices : this.getARoom(id).meta.devices
          }
        }
        var result = await RoomApi.modify(roomObj);
        this.rooms.find( room => room.id == id).name = newname;
        return result;
      } catch (error) {
        console.error(error);
      }
    },
    async updateARoomByName(oldname, newname){
      try {
        var roomId = getIdByName(this.rooms, oldname);
        return this.updateARoom(roomId, newname);
      } catch (error) {
        console.error(error);
      }
    },



    async deleteARoom(id){
      try {
        this.deleteRoomDevices(id);
        var result = await RoomApi.remove(id);
        removeItemFromArray(this.rooms, id);
        return result;
      } catch (error) {
        console.error(error);
      }
    },
    async deleteARoomByName(name){
      try {
        var roomId = getIdByName(this.rooms, name);
        return this.deleteARoom(roomId);
      } catch (error) {
        console.error(error);
      }
    },

/*  */

    /* -------------------------------------------------- DEVICES -------------------------------------------------- */
    getAllDevices(){
      return this.devices;
    },
    async getAllDevicesAPI() {
      try {
        var result = await DevicesApi.getAll();
        this.devices = result;
        return result;
      } catch (error) {
        console.error(error);
      }
    },
    getADevice(id){
      return this.devices.find( devices => devices.id == id);
    },
    getADeviceByName(name){
      var deviceId = getIdByName(this.devices, name);
      return this.getADevice(deviceId);
    },



    async createADevice(roomName, deviceName, type){
      try {
        var typeId = getIdByName(this.supportedDevices, type);
        var deviceObj = {
          type : {
            id : typeId
          },
          name : deviceName,
          meta : {
            component : "default"
          }
        }
        switch(type.toLowerCase()){
          case 'speaker':
            deviceObj.meta.component = SpeakerBox
            break;
          case 'faucet':
            deviceObj.meta.component = TapBox
            break;
          case 'refrigerator':
            deviceObj.meta.component = FridgeBox
            break;
          case 'oven':
            deviceObj.meta.component = OvenBox
            break;
          case 'blinds':
            deviceObj.meta.component = CurtainBox
            break;
          default :
            console.log(`${type} should be one of these : blinds, faucet, refrigerator, oven, speaker `);
        }

        console.log(deviceObj);

        // UPDATE DE DEVICE
        // remoto
        var result = await DevicesApi.add(deviceObj);
        console.log(result);
        // local
        this.devices.push(result);
        // UPDATE DE ROOMS
        // local
        var room = this.getARoomByName(roomName);
        room.meta.devices.push(result.id);
        // remoto
        this.updateARoom(room.id, room.name);

        return result;
      } catch (error) {
        console.error(error);
      }
    },
    transferDevice(deviceId ,oldRoomId, newRoomId){
      for ( let i = 0 ; i < this.rooms; i++ ){
        if ( this.rooms[i].id === newRoomId ){
          this.rooms[i].meta.devices.push(deviceId)
        }
        if ( this.rooms[i].id === oldRoomId ){
          removeItemFromArray(this.rooms[i].meta.devices, deviceId);
        }
      }
    },



    async updateADevice(id, newname ){
      try {
        // UPDATE DE DEVICES
        // remoto
        var deviceObj = {
          id : id,
          name : newname,
          meta: {
            component : this.getADevice(id).meta.component
          }
        }
        console.log(deviceObj);
        var result = await DevicesApi.modify(deviceObj);
        // local
        this.devices.find( device => device.id == id).name = newname;
        // no necesito hacer el update de ROOMS porque solo tiene el ID de referencia
        return result;
      } catch (error) {
        console.error(error);
      }
    },
    async updateADeviceByName(oldname, newname){
      try {
        var deviceId = getIdByName(this.devices, oldname);
        this.updateADevice(deviceId, newname);
      } catch (error) {
        console.error(error);
      }
    },
    async updateADeviceState(id, action, paramsArr ){
      // se ejecuta accion y se cambia el estado del device en la API
      // console.log("id: " + )
      try{
        var result = await DevicesApi.executeAction(id, action, paramsArr)
        this.updateADeviceStateLocal(id, action, paramsArr);
        return result;
      }catch(error){
        console.log(error);
      }
    },


    /* le vengo dando vueltas a la idea esta que me parece horrible, la base de dato
    no coopera con la idea de que vos cambies el estado, pense que podria agegar la
    metadata necesaria para que cada accion sepa que debe cambiar en el estado de un
    componente pero mantener esa nueva estructura tambien requiere de un switch
    y mucho anidamiento interno para hacerlo andar
    la otra opcion es agregar "eventos" a esto, pero como no se realmente que hace
    cada una de las funciones es medio ciego ese intento */
    updateADeviceStateLocal(deviceId, action, paramsArr ){
      var deviceType;
        for ( let i = 0; i < this.devices.length; i++)
          if ( this.devices[i].id == deviceId){
            deviceType = this.devices[i].type.name
            switch (deviceType) {
              case 'blinds':
                console.log("BLINDS LOCALLY UPDATED");
                switch(action){
                  case 'open':
                    this.devices[i].state.status = 'opened';
                    break;
                  case 'close':
                    this.devices[i].state.status = 'closed';
                    break;
                  case 'setLevel':
                    this.devices[i].state.currentLevel = paramsArr[0];
                    break;
                  default:
                    console.log(`${action} is not a valid action for ${deviceType} `)
                }
                break;
              case 'faucet':
                console.log("FAUCET LOCALLY UPDATED");
                switch(action){
                  case 'open':
                    this.devices[i].state.status = 'opened';
                    break;
                  case 'close':
                    this.devices[i].state.status = 'closed';
                    break;
                  case 'dispense':
                    this.devices[i].state.status = 'opened';
                    break;
                  default:
                    console.log(`${action} is not a valid action for ${deviceType} `)
                }
                break;
              case 'refrigerator':
                console.log("REFRIGERATOR LOCALLY UPDATED");
                switch(action){
                  case 'setFreezerTemperature':
                    this.devices[i].state.freezerTemperature = paramsArr[0];
                    break;
                  case 'setTemperature':
                    this.devices[i].state.temperature = paramsArr[0];
                    break;
                  case 'setMode':
                    this.devices[i].state.mode = paramsArr[0];
                    break;
                  default:
                    console.log(`${action} is not a valid action for ${deviceType} `)
                }
                break;
              case 'oven':
                console.log("OVEN LOCALLY UPDATED");
                switch(action){
                  case 'turnOn':
                    this.devices[i].state.status = 'on';
                    break;
                  case 'turnOff':
                    this.devices[i].state.status = 'off';
                    break;
                  case 'setTemperature':
                    this.devices[i].state.temperature = paramsArr[0];
                    break;
                  case 'setHeat':
                    this.devices[i].state.heat = paramsArr[0];
                    break;
                  case 'setGrill':
                    this.devices[i].state.grill = paramsArr[0];
                    break;
                  default:
                    console.log(`${action} is not a valid action for ${deviceType} `)
                }
                break;
              case 'speaker':
                console.log("SPEAKER LOCALLY UPDATED");
                /* Estas funcionalidades son freestyle */
                switch(action){
                  case 'setVolume':
                    this.devices[i].state.volume = paramsArr[0];
                    break;
                  case 'play':
                    this.devices[i].state.status = 'playing';
                    break;
                  case 'stop':
                    this.devices[i].state.status = 'stopped';
                    break;
                  case 'pause':
                    this.devices[i].state.status = 'paused';
                    break;
                  case 'resume':
                    this.devices[i].state.status = 'playing';
                    break;
                  /* work in progress */
                  case 'setGenre':
                    this.devices[i].state.genre = paramsArr[0];
                    this.devices[i].state.song = paramsArr[0];
                    break;
                  case 'nextSong':
                    this.devices[i].state.song = paramsArr[0];
                    break;
                  case 'previousSong':
                    this.devices[i].state.song = paramsArr[0];
                    break;
                  case 'getPlaylist':
                    this.devices[i].state.playlist = paramsArr[0];
                    break;
                  default:
                    console.log(`${action} is not a valid action for ${deviceType} `)
                }
                break;
              default:
                console.log(`${deviceType} should be one of these : blinds, faucet, refrigerator, oven, speaker `);
            }
          }
    },


    async deleteADevice(id){
      try {
        // UPDATE DE DEVICES
        // remoto
        var result = await DevicesApi.remove(id);
        // local
        removeItemFromArray(this.devices, id);
        // UPDATE DE ROOMS
        // update local
        var room = this.getARoomByName(this.getDevicesRoom(id));                        // room es el cuarto que tiene el dispositivo con id
        if ( room ){
          var index = room.meta.devices.findIndex(dId => dId === id);   // el index del dispositivo dentro de room que tiene el id que busco
          if (index !== -1) {
            room.meta.devices.splice(index, 1);                         // lo extraigo
          }
        }
        // update remoto
        this.updateARoom(room.id, room.name);
        // delete component
        //var device = this.getADevice(id);
        //var index = this.components.findIndex(component => component.name === device.type.name + "Box");
        //if (index !== -1) {
        //  this.components.splice(index, 1);
        //} //chequear
        this.getAllDevicesAPI();
        return result;
      } catch (error) {
        console.error(error);
      }
    },
    async deleteADeviceByName(name){
      try {
        var deviceId = getIdByName(this.devices, name);

        return this.deleteADevice(deviceId);
      } catch (error) {
        console.error(error);
      }
    },
    //getcomponents
    getComponents(){
      return this.components;
    },
    /* -------------------------------------------------- ROOM - DEVICES -------------------------------------------------- */

    searchDevicesRoom(id){
      for ( let i = 0; i < this.rooms.length; i++ ){
        for ( let j = 0; j < this.rooms[i].meta.devices.length; j++){
          if ( this.rooms[i].meta.devices[j] == id ){
            console.log(this.rooms[i].name);
            return this.rooms[i].name;
          }
        }
      }
      return null;
    },
    // no testeada
    getRoomDevices(idRoom){
      var arr = [];
      console.log("getRoomDevices");
      console.log(idRoom);
      var room = this.getARoom(idRoom);
      if ( room === undefined )
        return [];
      for ( let i = 0; i < room.meta.devices.length ; i++ ){
        arr.push(this.getADevice(room.meta.devices[i]));
      }
      return arr;
    },
    async deleteRoomDevices(idRoom) {
      var room = this.getARoom(idRoom);
      console.log("room entero: " + room);
      console.log("DEVICES ;");
      console.log(room.meta.devices);
      if ( room === undefined )
        return;
      for ( let i = 0; i < room.meta.devices.length ; i++ ){
        console.log("deleting device: " + room.meta.devices[i]);
        removeItemFromArray(this.devices, room.meta.devices[i] );
        await DevicesApi.remove(room.meta.devices[i]);
      }
    },


    /* -------------------------------------------------- ROUTINES -------------------------------------------------- */
    getAllRoutines(){
      return this.routines;
    },
    async getAllRoutinesAPI() {
      try {
        var result = await RoutinesApi.getAll();
        // hay que guardarla mejor localmente
        var routinesArr = []
        for ( let i = 0; i < result.length; i++ ){
          var routine = {
            id : result[i].id,
            name : result[i].name,
            actions : [],
            meta : {}
          }
          for ( let j = 0; j < result[i].actions.length; j++ ){
            var action = {
              device : {
                id : result[i].actions[j].device.id
              },
              actionName : result[i].actions[j].actionName,
              params : result[i].actions[j].params,
              meta : {}
            }
            routine.actions.push(action)
          }
          routinesArr.push(routine)
        }
        this.routines = routinesArr
        return result;
      } catch (error) {
        console.error(error);
      }
    },
    getARoutine(id){
      return this.routines.find( routines => routines.id == id) || "Routine not found";
    },
    getARoutineByName(name){
      var routineId = getIdByName(this.routines, name);
      return this.getARoutine(routineId);
    },


    // se deberia reempazar la defaultAction por actions, que tiene
    // que ser un array de objetos
    async createARoutine(routineName, actionsArr){
      try {
        console.log("Im here");
        var routineObj = {
          name : routineName,
          actions : actionsArr,
          meta : {}
        }
        var result = await RoutinesApi.add(routineObj);
        var routineObj2 = {
          id : result.id,
          name : routineName,
          actions : actionsArr,
          meta : {}
        }
        this.routines.push(routineObj2);
        return result;
      } catch (error) {
        console.error(error);
      }
    },

    async updateARoutineName(id, newname ){
      var routineObj = {
        id : id,
        name : newname,
        actions : this.getARoutine(id).actions
      }
      var result = await RoutinesApi.modify(routineObj);

      for ( let i = 0; i < this.routines.length; i++ )
        if ( this.routines[i].id == id )
          this.routines[i].name = newname


      // remoto
      // local


      console.log(this.routines);
    },

    async updateARoutine(id, newname, actions){
      console.log("UPDATING A ROUTINE NOOOOOOT BY NAME")
      try {
        var routineObj = {
          id : id,
          name : newname,
          actions : actions,
          meta : {}
        }
        console.log(routineObj)
        var result = await RoutinesApi.modify(routineObj);
        console.log(result)

        // update local
        for ( let i = 0; i < this.routines.length; i++ ){
          if ( this.routines[i].id = id )
            this.routines[i] = result;
        }
        return result;
      } catch (error) {
        console.error(error);
      }
    },
    async updateARoutineByName(oldname, newname, actions){
      try {
        var routineId = getIdByName(this.routines, oldname);
        this.updateARoutine(routineId, newname, actions);
      } catch (error) {
        console.error(error);
      }
    },



    async deleteARoutine(id){
      try {
        var result = await RoutinesApi.remove(id);
        removeItemFromArray(this.routines, id);
        return result;
      } catch (error) {
        console.error(error);
      }
    },
    async deleteARoutineByName(name){
      try {
        var routineId = getIdByName(this.routines, name);
        return this.deleteARoutine(routineId);
      } catch (error) {
        console.error(error);
      }
    },



    async deleteARoutine(id){
      try {
        var result = await RoutinesApi.remove(id);
        removeItemFromArray(this.routines, id);
        return result;
      } catch (error) {
        console.error(error);
      }
    },
    async deleteARoutineByName(name){
      try {
        var routineId = getIdByName(this.routines, name);
        return this.deleteARoutine(routineId);
      } catch (error) {
        console.error(error);
      }
    },

    async executeARoutine(routineId){
      console.log("received routineId" + routineId);
      var result = RoutinesApi.execute(routineId);
      console.log("routine executed");
    },

    /* -------------------------------------------------- ACTIONS -------------------------------------------------- */
    async getDeviceActionsAPI(){
      try{
        var result = await DevicesApi.getActions();
        this.deviceActionsRaw = result;
        this.deviceActions = this.digestActions(this.deviceActionsRaw);
      } catch(error){
        console.log(error);
      }
    },


    // genera el objeto de una accion, uno genera varias acciones/eventos los mete en un array y llama a create Routine
    createAction(deviceId, actionName, params){
      var action = {
        device : {
          id : deviceId,
        },
        actionName : actionName,
        params : params,
        meta :{
          name : this.getADevice(deviceId).name
        }
      }
      return action;
    },




    /* -------------------------------------------------- GETTERS CON PARAMETROS -------------------------------------------------- */


      getDevicesRoom(id){
        for ( let i = 0; i < this.rooms.length; i++ ){
          for ( let j = 0; j < this.rooms[i].meta.devices.length; j++){
            if ( this.rooms[i].meta.devices[j] == id ){
              return this.rooms[i].name;
            }
          }
        }
        return null;
      },
      getRoomDevices(idRoom){
        var arr = [];
        var room = this.getARoom(idRoom);
        if ( room === undefined )
          return null;
        for ( let i = 0; i < room.meta.devices.length ; i++ ){
          arr.push(this.getADevice(room.meta.devices[i]));
        }
        return arr;
      },

      async getDeviceStateAPI(id){
        try {
          var result = await DevicesApi.getState(id)
          return result;
        } catch (error) {
          console.error(error);
        }
      },
      getDeviceState(deviceId){
        for ( let i = 0; i < this.devices.length; i++ ){
          if ( this.devices[i].id == deviceId ){
            return this.devices[i].state;
          }
        }
        return "No device Found?";
      },
      getDeviceStateByName(deviceId){
        return this.getDeviceState(getADevice(deviceId).id);
      },
      // esta tiene mas sentido  en el flujo del formulario
      getTypeActions(deviceType){
        for ( let j = 0; j < this.deviceActions.length; j++)
          if( this.deviceActions[j].name == deviceType )
            return this.deviceActions[j].actions
      },
      getTypeActionsNames(deviceType){
        var actionsNameArr = this.getTypeActions(deviceType);
        var returnArr = [];
        for ( let i = 0; i < actionsNameArr.length; i++)
          returnArr.push(actionsNameArr[i].name);
        return returnArr;
      },
      // mas general
      getDeviceActions(deviceId){
        var deviceType;
        for ( let i = 0; i < this.devices.length; i++)
          if ( this.devices[i].id == deviceId)
            deviceType = this.devices[i].type.name
        for ( let j = 0; j < this.deviceActions.length; j++)
          if( this.deviceActions[j].name == deviceType )
            return this.deviceActions[j].actions
      },
      getDeviceActionsNames(deviceId){
        if ( deviceId == '' )
          return '';
        var actionsNameArr = this.getDeviceActions(deviceId);
        var returnArr = [];
        for ( let i = 0; i < actionsNameArr.length; i++)
          returnArr.push(actionsArr[i].name);
        return returnArr;
      },
      getDeviceActionsNamesByName(deviceName){
        return this.getDeviceActionsNames(this.getADeviceByName(deviceName).id)
      },
      getDeviceActionsByType(deviceType){
        for ( let i = 0; i < this.deviceActions.length; i++)
          if( this.deviceActions[i].name == deviceType )
            return this.deviceActions[i].actions;
        return null;
      },
      getActionParameters(deviceType, actionName){
        var actionsArr = this.getDeviceActionsByType(deviceType);
        for ( let i = 0; i < actionsArr.length; i++)
          if ( actionsArr[i].name == actionName ){
            return actionsArr[i].params;
          }
      },
      getRoutineActions(routineName){
        for ( let i = 0; i < this.routines.length; i++ ){
          if ( this.routine[i].name == routineName ){
            return this.routine[i];
          }
        }
      },
      async getPlaylistAPI(deviceId){
        console.log("FUI LLAMADO");
        this.playlist = await this.updateADeviceState(deviceId, "getPlaylist", []);
        console.log(this.playlist)
        return this.playlist
      },



      // esta funcion reduce el grueso de los dispositivos y sus acciones a algo mas simple basado en los dispositivos que soportamos
      digestActions( deviceActionsRaw){
        var returnArr = []
        for ( let i = 0; i  < deviceActionsRaw.length; i++){  // los 10 dispositivos
          if (this.supportedDevicesNames.includes(deviceActionsRaw[i].name)){
            var deviceActionsObj ={
              name : deviceActionsRaw[i].name,
              id : deviceActionsRaw[i].id,
              actions : []
            } ;
            for ( let j = 0; j < deviceActionsRaw[i].actions.length; j++ ){ // las acciones de cada dispositivo
              var actionParams = {
                name : deviceActionsRaw[i].actions[j].name,
                params : [],
              }
              for ( let k = 0; k < deviceActionsRaw[i].actions[j].params.length; k++){ // los parametros de cada accion de cada dispositivo
                actionParams.params.push(deviceActionsRaw[i].actions[j].params[k]);
              }
              deviceActionsObj.actions.push(actionParams);
            }
            returnArr.push(deviceActionsObj);
          }
        }
        return returnArr;
      }



  },
      /* -------------------------------------------------- GETTERS SIN PARAMETROS -------------------------------------------------- */

  getters :{
    getRoomNames(){
      var arr = [];
      for ( let i = 0; i < this.rooms.length; i++ ){
        arr.push( this.rooms[i].name );
      }
      return arr;
    },
    getDevicesNames(){
      var arr = [];
      for ( let i = 0; i < this.devices.length; i++ ){
        arr.push( this.devices[i].name );
      }
      return arr;
    },
    getRoutinesNames(){
      var arr = [];
      for ( let i = 0; i < this.routines.length; i++ ){
        arr.push( this.routines[i].name );
      }
      return arr;
    },
    getSupportedDevicesNames(){
      var arr = [];
      for ( let i = 0; i < this.supportedDevices.length; i++ ){
        arr.push( this.supportedDevices[i].name );
      }
      return arr;
    },

  }
})


