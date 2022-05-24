import {db} from './firebase.js';
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-firestore.js";

let bebes = [];
let bebes1 = [];
let babys = 0;
let data =[];
let cont = 0; 
let temperatura = '';
let frecuencia = '';
let temp = 0;
let pulse = 0; 
let babys1 = 0; 


let GInmaduro=0;
let Pextremo=0;
let Psevero=0;
let Pmoderado=0;
let Ptardio=0;
let Tprecoz=0;
let Tmaduro=0;
let postermino=0;

let masculino=0; 
let femenino=0;

window.onload = function() {
    var carga = document.getElementById('contenedor_carga');
    carga.style.visibility = 'hidden';
    carga.style.opacity = '0';
}

window.addEventListener('DOMContentLoaded', async e =>{
    try {
      bebes = await getDocs(collection(db, "Bebes"));
      bebes.forEach((doc) => {

        if(doc.data().Genero == 'Masculino') masculino++;
        else if(doc.data().Genero == 'Femenino') femenino++;

        if(doc.data().Clasificacion == 'Gran Inmaduro') GInmaduro++;
        else if(doc.data().Clasificacion == 'Pretérmino extremo') Pextremo++;
        else if(doc.data().Clasificacion == 'Pretérmino severo') Psevero++;
        else if(doc.data().Clasificacion == 'Pretérmino moderado') Pmoderado++;
        else if(doc.data().Clasificacion == 'Pretérmino tardío') Ptardio++;
        else if(doc.data().Clasificacion == 'Término precoz') Tprecoz++;
        else if(doc.data().Clasificacion == 'Término maduro') Tmaduro++;
        else if(doc.data().Clasificacion == 'Postérmino') postermino++;
        babys++;
      });

      bebes1 = await getDocs(collection(db, "Registros"));
      bebes1.forEach((doc) => {

        if(doc.data().Genero == 'Masculino') masculino++;
        else if(doc.data().Genero == 'Femenino') femenino++;

        if(doc.data().Clasificacion == 'Gran Inmaduro') GInmaduro++;
        else if(doc.data().Clasificacion == 'Pretérmino extremo') Pextremo++;
        else if(doc.data().Clasificacion == 'Pretérmino severo') Psevero++;
        else if(doc.data().Clasificacion == 'Pretérmino moderado') Pmoderado++;
        else if(doc.data().Clasificacion == 'Pretérmino tardío') Ptardio++;
        else if(doc.data().Clasificacion == 'Término precoz') Tprecoz++;
        else if(doc.data().Clasificacion == 'Término maduro') Tmaduro++;
        else if(doc.data().Clasificacion == 'Postérmino') postermino++;
        babys1++;
      });

      babys1 += babys;

      data = await getDocs(collection(db, "Datos"));
      data.forEach((doc) => {
        //Calculo de promedios
        temperatura = parseFloat(doc.data().temperatura);
        temp += temperatura;  
        frecuencia = parseFloat(doc.data().pulse);
        pulse += frecuencia;

        //Calculo de clasificaciones
        cont++;
      });

      temp = temp/cont;
      pulse = pulse/cont;
      const ctx = document.getElementById('promTemp').getContext('2d');
          const myChart = new Chart(ctx, {
              type: 'bar',
              data: {
                  labels: ['Temperatura'],
                  datasets: [{
                      label: 'Temperatura promedio',
                      data: [temp],
                      backgroundColor: [
                          'rgba(153, 102, 255, 0.2)',
                          'rgba(255, 159, 64, 0.2)'
                      ],
                      borderColor: [
                          'rgba(153, 102, 255, 1)',
                          'rgba(255, 159, 64, 1)'
                      ],
                      borderWidth: 1
                  }]
              },
              options: {
                  scales: {
                      y: {
                          beginAtZero: true
                      }
                  }
              }
          });
    
          const ctx1 = document.getElementById('promPulse').getContext('2d');
          const myChart1 = new Chart(ctx1, {
              type: 'bar',
              data: {
                  labels: [ 'Pulso'],
                  datasets: [{
                      label: 'Pulso promedio',
                      data: [pulse],
                      backgroundColor: [     
                          'rgba(54, 162, 235, 0.2)',
                          'rgba(255, 206, 86, 0.2)',
                          'rgba(75, 192, 192, 0.2)',
                          'rgba(153, 102, 255, 0.2)',
                          'rgba(255, 159, 64, 0.2)'
                      ],
                      borderColor: [
                          'rgba(54, 162, 235, 1)',
                          'rgba(255, 206, 86, 1)',
                          'rgba(75, 192, 192, 1)',
                          'rgba(153, 102, 255, 1)',
                          'rgba(255, 159, 64, 1)'
                      ],
                      borderWidth: 1
                  }]
              },
              options: {
                  scales: {
                      y: {
                          beginAtZero: true
                      }
                  }
              }
          });
    
          const ctx3 = document.getElementById('Actual').getContext('2d');
          const myChart3 = new Chart(ctx3, {
              type: 'bar',
              data: {
                  labels: ['En monitoreo'],
                  datasets: [{
                      label: '# Bebés actualmente',
                      data: [babys],
                      backgroundColor: [
                          'rgba(255, 99, 132, 0.2)',
                          'rgba(54, 162, 235, 0.2)',
                          'rgba(255, 206, 86, 0.2)',
                          'rgba(75, 192, 192, 0.2)',
                          'rgba(153, 102, 255, 0.2)',
                          'rgba(255, 159, 64, 0.2)'
                      ],
                      borderColor: [
                          'rgba(255, 99, 132, 1)',
                          'rgba(54, 162, 235, 1)',
                          'rgba(255, 206, 86, 1)',
                          'rgba(75, 192, 192, 1)',
                          'rgba(153, 102, 255, 1)',
                          'rgba(255, 159, 64, 1)'
                      ],
                      borderWidth: 1
                  }], 
              },
              options: {
                  scales: {
                      y: {
                          beginAtZero: true
                      }
                  }
              }
          });

        var objetivo = document.getElementById('Total');
        objetivo.innerHTML=babys1;

        const ctx4 = document.getElementById('Clasificacion').getContext('2d');
          const myChart4 = new Chart(ctx4, {
              type: 'doughnut',
              data: {
                  labels: ['Gran Inmaduro', 'Pretérmino extremo', 'Pretérmio severo', 'Pretérmino moderado', 'Pretérmino tardío', 'Término precoz', 'Término maduro', 'Postérmino'],
                  datasets: [{
                      label: '# Bebés actualmente',
                      data: [GInmaduro,Pextremo,Psevero,Pmoderado,Ptardio,Tprecoz,Tmaduro,postermino],
                      backgroundColor: [
                          'rgba(255, 99, 132, 0.2)',
                          'rgba(54, 162, 235, 0.2)',
                          'rgba(255, 206, 86, 0.2)',
                          'rgba(75, 192, 192, 0.2)',
                          'rgba(153, 102, 255, 0.2)',
                          'rgba(255, 159, 64, 0.2)',
                          'rgba(0, 255, 255, 0.2)',
                          'rgba(0, 0, 139, 0.2)',
                          
                      ],
                      borderColor: [
                          'rgba(255, 99, 132, 1)',
                          'rgba(54, 162, 235, 1)',
                          'rgba(255, 206, 86, 1)',
                          'rgba(75, 192, 192, 1)',
                          'rgba(153, 102, 255, 1)',
                          'rgba(255, 159, 64, 1)',
                          'rgba(0, 255, 255, 1)',
                          'rgba(0, 0, 139, 1)',
                      ],
                      hoverOffset: 4
                  }], 
              },
              
          });

          const ctx5 = document.getElementById('Sexo').getContext('2d');
          const myChart5 = new Chart(ctx5, {
              type: 'bar',
              data: {
                  labels: ['Femenino', 'Masculino' ],
                  datasets: [{
                      label: [],
                      data: [femenino,masculino],
                      backgroundColor: [
                          'rgba(255, 99, 132, 0.2)',
                          'rgba(54, 162, 235, 0.2)',
                          'rgba(255, 206, 86, 0.2)',
                          'rgba(75, 192, 192, 0.2)',
                          'rgba(153, 102, 255, 0.2)',
                          'rgba(255, 159, 64, 0.2)',
                          'rgba(0, 255, 255, 0.2)',
                          'rgba(0, 0, 139, 0.2)',
                          
                      ],
                      borderColor: [
                          'rgba(255, 99, 132, 1)',
                          'rgba(54, 162, 235, 1)',
                          'rgba(255, 206, 86, 1)',
                          'rgba(75, 192, 192, 1)',
                          'rgba(153, 102, 255, 1)',
                          'rgba(255, 159, 64, 1)',
                          'rgba(0, 255, 255, 1)',
                          'rgba(0, 0, 139, 1)',
                      ],
                      hoverOffset: 4
                  }], 
              },
              
          });
            
    } catch (error) {
        console.log(error)
    }
  });


        