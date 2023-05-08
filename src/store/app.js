// Utilities
import { defineStore } from 'pinia'


import { removeItemFromArray } from '@/Lib/lib.js'
import { getIdByName } from '@/Lib/lib.js'


import { DevicesApi } from '@/API/devices';
import { RoomApi } from '@/API/room.js';
import { RoutinesApi } from '@/API/routines';

import VacuumBox from '../components/DeviceComponents/VacuumBox.vue';
import CurtainBox from '@/components/DeviceComponents/CurtainBox.vue';
import TapBox from '@/components/DeviceComponents/TapBox.vue';
import FridgeBox from '@/components/DeviceComponents/FridgeBox.vue';
import OvenBox from '@/components/DeviceComponents/OvenBox.vue';

/*



*/


export const useAppStore = defineStore('app', {
  state: () => ({
    rooms : [],
    routines : [],
    devices : [],
    components : [],
    deviceActionsRaw : [],
    deviceActions : [],

    // vacuum cleaner, oven, fridge, curtain, tap/sprinkler

    // STATIC API DATA

    supportedDevices : [{
      id: "eu0v2xgprrhhg41g",
      name: "Blinds"
      },{
      id: "im77xxyulpegfmv8",
      name: "Oven"
      },{
      id: "ofglvd9gqx8yfl3l",
      name: "Vacuum"
      },{
      id: "rnizejqr2di0okho",
      name: "Refrigerator"
      },{
      id: "dbrlsh7o5sn8ur4i",
      name: "Faucet"
    }],
    supportedDevicesNames : [ "blinds","oven" ,"vacuum" , "refrigerator", "faucet"]
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



    /* -------------------------------------------------- DEVICES -------------------------------------------------- */
    getAllDevices(){
      return this.devices;
    },
    async getAllDevicesAPI() {
      try {
        var result = await DevicesApi.getAll();
        this.devices = result;

        //empty components
        this.components = [];


        for ( let i = 0; i < this.devices.length; i++ ){
          console.log(this.devices[i].type.name);
          if(this.devices[i].type.name == "vacuum"){
            this.components.push({
              component: VacuumBox,
              id: this.devices[i].type.id,
              name: this.devices[i].name
            });
          }else if(this.devices[i].type.name == "faucet"){
            this.components.push({
              component: TapBox,
              id: this.devices[i].type.id,
              name: this.devices[i].name
            });
          }else if(this.devices[i].type.name == "refrigerator"){
            this.components.push({
              component: FridgeBox,
              id: this.devices[i].type.id,
              name: this.devices[i].name
            });
          }else if(this.devices[i].type.name == "oven"){
            this.components.push({
              component: OvenBox,
              id: this.devices[i].type.id,
              name: this.devices[i].name
            });
          }else if(this.devices[i].type.name == "blinds"){
            this.components.push({
              component: CurtainBox,
              id: this.devices[i].type.id,
              name: this.devices[i].name
            });
          }
        }
        console.log("uploadeo devices api");
        console.log("devices")
        console.log(this.devices.length);
        console.log("components")
        console.log(this.components.length);
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
        // UPDATE DE DEVICES
        // remoto
        // const vacuumFunction = () => {
        //   this.components.push(VacuumBox);
        // };
        // const curtainFunction = () => {
        //   this.components.push(CurtainBox);
        // };
        // const faucetFunction = () => {
        //   this.components.push(TapBox);
        // };
        // const fridgeFunction = () => {
        //   this.components.push(FridgeBox);
        // };
        // const ovenFunction = () => {
        //   this.components.push(OvenBox);
        // };
        // const blindsFunction = () => {
        //   this.components.push(CurtainBox);
        // };

        // const deviceMap = {
        //   "Vacuum": vacuumFunction,
        //   "Curtain": curtainFunction,
        //   "Faucet": faucetFunction,
        //   "Refrigerator": fridgeFunction,
        //   "Oven": ovenFunction,
        //   "Blinds": blindsFunction
        // };


        var typeId = getIdByName(this.supportedDevices, type);
        var deviceObj = {
          type : {
            id : typeId
          },
          name : deviceName
        }
        var result = await DevicesApi.add(deviceObj);
        // local
        this.devices.push(result);
        // UPDATE DE ROOMS
        // local
        var room = this.getARoomByName(roomName);
        room.meta.devices.push(result.id);
        // remoto
        this.updateARoom(room.id, room.name);
        deviceMap[type]();

        return result;
      } catch (error) {
        console.error(error);
      }
    },



    async updateADevice(id, newname ){
      try {
        // UPDATE DE DEVICES
        // remoto
        var deviceObj = {
          id : id,
          name : newname,
        }
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
      try{
        var result = DevicesApi.executeAction(id, action, paramsArr)
        return result;
      }catch(error){
        console.log(error);
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
        var index = room.meta.devices.findIndex(dId => dId === id);   // el index del dispositivo dentro de room que tiene el id que busco
        if (index !== -1) {
          room.meta.devices.splice(index, 1);                         // lo extraigo
        }
        // update remoto
        this.updateARoom(room.id, room.name);
        //delete component
        // var device = this.getADevice(id);
        // var index = this.components.findIndex(component => component.name === device.type.name + "Box");
        // if (index !== -1) {
        //   this.components.splice(index, 1);
        //} //chequear
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
      console.log(this.components.length);
      console.log("uploadeo componentes");
      return this.components;
    },
    /* -------------------------------------------------- ROOM - DEVICES -------------------------------------------------- */

    searchDevicesRoom(id){
      for ( let i = 0; i < this.rooms.length; i++ ){
        for ( let j = 0; j < this.rooms[i].meta.devices.length; j++){
          if ( this.rooms[i].meta.devices[j] == id ){
            return this.rooms[i].name;
          }
        }
      }
      return null;
    },
    // no testeada
    getRoomDevices(idRoom){
      var arr = [];
      var room = this.getARoomByName(idRoom);
      for ( let i = 0; i < room.meta.devices ; i++ ){
        arr.push(this.getADevice(room.meta.devices));
      }
      return arr;
    },


    /* -------------------------------------------------- ROUTINES -------------------------------------------------- */
    getAllRoutines(){
      return this.routines;
    },
    async getAllRoutinesAPI() {
      try {
        var result = await RoutinesApi.getAll();
        this.routines = result;
        return result;
      } catch (error) {
        console.error(error);
      }
    },
    getARoutine(id){
      return this.routines.find( routines => routines.id == id);
    },
    getARoutineByName(name){
      var routineId = getIdByName(this.routines, name);
      return this.getARoutine(routineId);
    },


    // se deberia reempazar la defaultAction por actions, que tiene
    // que ser un array de objetos
    async createARoutine(routineName, actions){
      try {
        var routineObj = {
          name : routineName,
          actions : actions,
          meta : {}
        }
        var result = await RoutinesApi.add(routineObj);
        this.routines.push(result);
        return result;
      } catch (error) {
        console.error(error);
      }
    },



    // De nuevo el problema con Actions[]
    async updateARoutine(id, newname, actions){
      try {
        var routineObj = {
          id : id,
          actions : {
            id : "4551cd84667ff8e1"
          },
          actionName : "turnOff",
          params : [],
          meta : {}
        }
        var result = await RoutinesApi.modify(routineObj);
        this.routines.find( routine => routine.id == id).name = newname;
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



    /* -------------------------------------------------- ACTIONS -------------------------------------------------- */
    async getDeviceActionsAPI(){
      try{
        var result = await DevicesApi.getActions();
        this.deviceActionsRaw = result;
        this.deviceActions = await this.digestActions(this.deviceActionsRaw);
      } catch(error){
        console.log(error);
      }
    },



    // params es un array de parametros que puede recibir el actionName
    createAction(deviceId, actionName, params){
      var deviceType = this.getADevice(deviceId).type;
      console.log(deviceType);
      var action = {
        device : {
          id : deviceId,
        },
        actionName : actionName,
        params : params,
        meta :{}
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
        var room = this.getARoomByName(idRoom);
        for ( let i = 0; i < room.meta.devices ; i++ ){
          arr.push(this.getADevice(room.meta.devices));
        }
        return arr;
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


      getDeviceActions(deviceId){
        var deviceType;
        for ( let i = 0; i < this.devices.length; i++)
          if ( this.devices[i].id == deviceId)
            deviceType = this.devices[i].type.name
        for ( let j = 0; j < this.deviceActions.length; j++)
          if( this.deviceActions[j].name == deviceType )
            return this.deviceActions[j].actions;
      },
      getDeviceActionsNames(deviceId){
        var actionsArr = this.getDeviceActions(deviceId);
        var returnArr = [];
        for ( let i = 0; i < actionsArr.length; i++)
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
      getActionParameters(deviceId, actionName){
        var actionsArr = this.getDeviceActions(deviceId);
        for ( let i = 0; i < actionsArr.length; i++)
          if ( actionsArr.name == actionName )
            return actionsArr.params;
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
                actionParams.params.push(deviceActionsRaw[i].actions[j].params[k].name);
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


