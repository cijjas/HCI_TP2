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
    // vacuum cleaner, oven, fridge, curtain, tap/sprinkler
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
    }]
  }),



  actions :{
    /* -------------------------------------------------- ROOMS -------------------------------------------------- */
    getAllRooms(){
      return this.rooms;
    },
    async getAllRoomsAPI() {
      try {
        const result = await RoomApi.getAll();
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
        const result = await DevicesApi.getAll();
        this.devices = result;
  
        //empty components
        this.components = [];


        for ( let i = 0; i < this.devices.length; i++ ){  
          console.log(this.devices[i].type.name);
          if(this.devices[i].type.name == "vacuum"){
            this.components.push(VacuumBox);
            console.log("vacuum");
          }else if(this.devices[i].type.name == "faucet"){
            this.components.push(TapBox);
            console.log("tap");
          }else if(this.devices[i].type.name == "refrigerator"){
            this.components.push(FridgeBox);
            console.log("fridge");
          }else if(this.devices[i].type.name == "oven"){
            this.components.push(OvenBox);
            console.log("oven");
          }else if(this.devices[i].type.name == "blinds"){
            this.components.push(CurtainBox);
            console.log("curtain");
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

        // if(type == "Vacuum"){
        //   this.components.push(VacuumBox);
        // }else if(type == "Curtain"){
        //   this.components.push(CurtainBox);
        // }else if(type == "Faucet"){
        //   this.components.push(TapBox);
        // }else if(type == "Refrigerator"){
        //   this.components.push(FridgeBox);
        // }else if(type == "Oven"){
        //   this.components.push(OvenBox);
        // }else if(type == "Blinds"){
        //   this.components.push(CurtainBox);
        // }

        console.log("creo componente");

        console.log(this.devices.length);

        return result;
      } catch (error) {
        console.error(error);
      }
    },



    async updateADevice(id, newname){
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



    async deleteADevice(id){
      try {
        // UPDATE DE DEVICES
        // remoto
        var result = await DevicesApi.remove(id);
        // local
        removeItemFromArray(this.devices, id);
        // UPDATE DE ROOMS
        // update local
        var room = this.getARoomByName(this.searchDevicesRoom(id));                        // room es el cuarto que tiene el dispositivo con id
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
        const result = await RoutinesApi.getAll();
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


  },
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




/* startDummy(){
      this.addRoom('Kitchen');
      this.addDevice('Main Tap','Sprinkler/Tap','Kitchen');
      this.addDevice('Super Oven','Oven','Kitchen');
      this.addDevice('Super Fridge','Fridge','Kitchen');
      this.addDevice('Aspiradora 3000','Vacuum Cleaner','Kitchen');
      this.addDevice('Large Curtain','Curtain','Kitchen');

      this.addRoom('Bedroom');
      this.addDevice('Bedside Tap','Sprinkler/Tap','Bedroom');
      this.addDevice('Bedside Oven','Oven','Bedroom');
      this.addDevice('MiniBar','Fridge','Bedroom');
      this.addDevice('Roomba','Vacuum Cleaner','Bedroom');
      this.addDevice('Small Curtain','Curtain','Bedroom');

      this.addRoutine('Waking up!');
      this.addRoutine('Cooking!');
      this.addRoutine('Relaxing!');

    }, */
