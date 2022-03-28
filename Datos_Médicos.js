import { collection, addDoc } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js";
import {logEvent  } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-analytics.js";

import {db} from './firebase.js';
import {analytics} from './firebase.js';


const socket = io();

var a = document.getElementById('temperature');
var lat = document.getElementById('Latitud');
var long = document.getElementById('Longitud');

logEvent(analytics, 'Temperatura', { name: 'Temp'});

let activo=true;

if(activo){

  (() => {
  let info = document.getElementById('btn-send') ; 
     
 info.addEventListener('click',() => {

 

  
 socket.on('temp', function (data) {
   console.log(data);
   if(activo){
   
   if(data<50){
     temperature.innerHTML = `${data}°C`;
     temperature.value = data;
    
     
    } 
    if(data>50){
     Pulse.innerHTML = `${data}`;
     Pulse.value=data;
   }  
 }
 
  if(Pulse.value != "" && temperature.value !=""&& activo==true ||Pulse.value != 0 && temperature.value !=0 && activo==true ){
   try {
     const docRef = addDoc(collection(db, "Datos"), {
       temperatura: temperature.value,
       //pulse: Pulse.value,
      longitud: "",
      latitud:  ""
     });
     console.log("Document written with ID: ", docRef.id);
   } catch (e) {
     console.error("Error adding document: ", e);
   }
 }
 
 });
   
 },true);
 
 })();
 }
 
 (() => {
 
   let stop = document.getElementById('btn-stop') ;    
   stop.addEventListener('click',() => {
 
   activo=false;
   temperature.value=0;
   Pulse.value=0;
   
 
 },false);
 
 })();
 
 (() => {
 
   let newpulsera = document.getElementById('btn-new') ;    
   newpulsera.addEventListener('click',() => {
 
   activo=true;
   temperature.value="";
   Pulse.value="";
 
 
 },false);
 
 })();
