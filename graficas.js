import {db} from './firebase.js';
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-firestore.js";

let bebes = [];
let babys = 0;
let data =[];
let cont = 0; 
let temperatura = '';
let frecuencia = '';
let temp = 0;
let pulse = 0; 

window.onload = function() {
    var carga = document.getElementById('contenedor_carga');
    carga.style.visibility = 'hidden';
    carga.style.opacity = '0';
}

window.addEventListener('DOMContentLoaded', async e =>{
    try {
      bebes = await getDocs(collection(db, "Bebes"));
      bebes.forEach((doc) => {
        babys++;
      });

      data = await getDocs(collection(db, "Datos"));
      data.forEach((doc) => {
        temperatura = parseFloat(doc.data().temperatura);
        temp += temperatura;  
        frecuencia = parseFloat(doc.data().pulse);
        pulse += frecuencia;
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
            
    } catch (error) {
        console.log(error)
    }
  });


        