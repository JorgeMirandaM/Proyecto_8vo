  //import { collection, addDoc } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js";
//import { logEvent } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-analytics.js";

import { collection, addDoc }  from "https://www.gstatic.com/firebasejs/9.7.0/firebase-firestore.js";
import { logEvent } from  "https://www.gstatic.com/firebasejs/9.7.0/firebase-analytics.js";

import { db } from './firebase.js';
import { analytics } from './firebase.js';


const socket = io();

var a = document.getElementById('temperature');
var lat = document.getElementById('Latitud');
var long = document.getElementById('Longitud');

logEvent(analytics, 'Temperatura', { name: 'Temp' });

let activo = true;

if (activo) {


  (() => {
   

    let info = document.getElementById('btn-send');

    info.addEventListener('click', () => {

      socket.on('temp', function (data) {
        console.log(data);
        if (activo) {

          // let pul = Math.floor((Math.random() * (75 - 65 + 1)) + 65);
          // console.log(pul);
          // Pulse.value=pul;
    

          long.value="-103.3877487182";
          lat.value= "20.7544956207";

          if (data < 50) {
            temperature.innerHTML = `${data}°C`;
            temperature.value = data;
            if(data>40 || data<35){
              swal({
                title: "Alerta",
                text: "Temperatura fuera de rango",
                icon: "warning",
                buttons: true,
                dangerMode: true,
              })
              activo= false;
            }
            if(data==0){
              swal({
                title: "Alerta",
                text: "Bebe muerto",
                icon: "warning",
                buttons: true,
                dangerMode: true,
              })
            }


          }
          if (data > 500) {
            Pulse.innerHTML = `${data-500}`;
            Pulse.value = data-500;
            if (data-500 > 110 && data-500 <500) {

              swal({
                title: "Alerta",
                text: "Pulso fuera de rango",
                icon: "warning",
                buttons: true,
                dangerMode: true,
              })
              activo= false;
          }
          

          }
        }

        if (Pulse.value != "" && temperature.value != "" && activo == true || Pulse.value != 0 && temperature.value != 0 && activo == true) {
          setTimeout(function(){
          try {
            const docRef = addDoc(collection(db, "Datos"), {
              temperatura: temperature.value,
              pulse: Pulse.value,
              longitud: "-103.3877487182",
              latitud:  "20.7544956207"
            });
            console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            console.error("Error adding document: ", e);
          }
        },3000)
        }

      });

    }, true);

  })();
}

(() => {

  let stop = document.getElementById('btn-stop');
  stop.addEventListener('click', () => {

    activo = false;
    temperature.value = 0;
    Pulse.value = 0;


  }, false);

})();

(() => {

  let newpulsera = document.getElementById('btn-new');
  newpulsera.addEventListener('click', () => {

    activo = true;
    temperature.value = "";
    Pulse.value = "";


  }, false);

})();

