// Utilities
import { defineStore } from 'pinia'


import { removeItemFromArray } from '@/Lib/lib.js'
import { getIdByName } from '@/Lib/lib.js'


import { DevicesApi } from '@/API/devices';
import { RoomApi } from '@/API/room.js';

/*
Prototipos :
  Rooms :
    rooms[] getAllRooms();
    rooms[] getAllRoomsAPI();                     [ASYNC]   // esta funcion no deberia fuera del Mount
    room{}  getARoom(id);
    room{}  getARoomByName(name);
    room{}  createARoom(roomName);                [ASYNC]
    boolean updateARoom(id, newname);             [ASYNC]
    boolean updateARoomByName(oldname, newname);  [ASYNC]
    boolean deleteARoom(id):                      [ASYNC]
    boolean deleteARoomByName(name, id):          [ASYNC]


*/


export const useAppStore = defineStore('app', {
  state: () => ({
    rooms : [],
    routines : [],
    devices : [],
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
          name : roomName
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
          name : newname
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



    async createADevice(deviceName, type){
      try {
        var typeId = getIdByName(this.supportedDevices, type);
        var deviceObj = {
          type : {
            id : typeId
          },
          name : deviceName
        }
        var result = await DevicesApi.add(deviceObj);
        this.devices.push(result);
        return result;
      } catch (error) {
        console.error(error);
      }
    },



    async updateADevice(id, newname){
      try {
        var deviceObj = {
          id : id,
          name : newname,
          meta : {}
        }
        var result = await DevicesApi.modify(deviceObj);
        this.devices.find( device => device.id == id).name = newname;
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
        var result = await DevicesApi.remove(id);
        removeItemFromArray(this.devices, id);
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


    /* -------------------------------------------------- ROUTINES -------------------------------------------------- */
    addRoutine(routineName){
      this.routines.push({
        id : this.routineId,
        name : routineName,
        actions : []
      });
      this.routineId++;
    },
    addAction(routineName, changes){
      /*
          esto va a ser un find segun routine name, y le agrega una accion
          como platnear las acciones, podria ser una funcion eterna donde la mayoria es null
          podria ser un objeto y se buscan matches pero medio feo
          podria recibir el type y facilitar el destructuring, y asume que vienen en orden, lo que es controlable
      */
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
