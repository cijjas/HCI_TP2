// Utilities
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    roomId : 0,
    routineId : 0,
    deviceId : 0,

    rooms : [],
    routines : [],
    devices : [],

    supportedDevices : ['Sprinkler/Tap','Vacuum Cleaner', 'Oven', 'Fridge', 'Curtain']
  }),
  actions :{
    startDummy(){
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

    },
    addRoom(roomName){
      this.rooms.push({
        id : this.roomId,
        name : roomName,
        devices : []
      });
      this.roomId++;
    },
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

    addDevice(deviceName, deviceType, deviceRoom){
      if ( this.rooms.length == 0 )
        return;
      /* Lo agrego a los devices de un room */
      this.rooms.find( room => room.name == deviceRoom).devices.push(
        {
          id: this.deviceId,
          name: deviceName,
          deviceType : deviceType,
        }
      )
      /* va a haber un case aca */
      /*
        Yo supongo que esta seccion se va a cambiar por objetos a los cuales les haces new
        y utilizas sus getters y setters para obtener
      */
      /* Agrego el device a los devices */
      if ( deviceType === 'Vacuum Cleaner'){
        this.devices.push({
          id: this.deviceId,
          name: deviceName,
          deviceType : deviceType,
          room : deviceRoom,
          state : "Off",
          mode : "Vacuum",
          base : deviceRoom
          })
      }
      if ( deviceType === 'Sprinkler/Tap'){
        this.devices.push({
          id: this.deviceId,
          name: deviceName,
          deviceType : deviceType,
          room : deviceRoom,
          state : "Off"
          })
      }
      if ( deviceType === 'Curtain'){
        this.devices.push({
          id: this.deviceId,
          name: deviceName,
          deviceType : deviceType,
          room : deviceRoom,
          state : "Open",
          position : 0,
          })
      }
      if ( deviceType === 'Oven'){
        this.devices.push({
          id: this.deviceId,
          name: deviceName,
          deviceType : deviceType,
          room : deviceRoom,
          state : "Off",
          temperature : 0,
          source : "",
          grill : "Off",
          convection : "Off"
          })
      }
      if ( deviceType === 'Fridge'){
        this.devices.push({
          id: this.deviceId,
          name: deviceName,
          deviceType : deviceType,
          room : deviceRoom,
          freezerTemp : 0,
          fridgeTemp : 0,
          mode : 'Normal'
          })
      }
      this.deviceId++;
    }
  },
  getters :{
    getRooms : (state) =>{
      return state.rooms;
    },
    getRoutines : (state) =>{
      return state.routines;
    },
    getDevices : (state) =>{
      return state.devices;
    },
    getSupportedDevices : (state) =>{
      return state.supportedDevices;
    },

  }
})
