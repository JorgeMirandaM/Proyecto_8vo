
import { collection, addDoc, getDocs,deleteDoc, doc } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js";

import {db} from './firebase.js';



//Metodo para eliminar

function deleteDocument (){
    const btns = document.querySelectorAll('.btn-danger');
    btns.forEach(btn => {
      btn.addEventListener('click', async (e) => {
         console.log(e.target.dataset.id);
         await deleteDoc(doc(db, 'Bebes', e.target.dataset.id));
      })
    })
  }
  
   //Almacenar los datos en la base de datos
  const informationForm = document.getElementById('information-form');
 
  informationForm.addEventListener('submit', e =>{
    e.preventDefault();
    var time = "";
    var selected = "";
    time = hnacimiento.value;
    var e = document.getElementById('Cuneros');
    var str = e.options[e.selectedIndex].value;
    if (document.getElementById('sexo').checked) {
      selected = document.getElementById('sexo').value;
    }
    if (document.getElementById('sexo1').checked) {
      selected = document.getElementById('sexo1').value;
    }
    try {
      const docRef = addDoc(collection(db, "Bebes"), {
        NombrePadres: names.value,
        ApellidoP: lastname.value,
        ApellidoM: lastname1.value,
        Genero: selected,
        Peso: peso.value,
        Fecha: fnacimiento.value,
        Hora: time,
        Cunero: str
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    limpiarFormulario();
  });
    function limpiarFormulario() {
    document.getElementById("information-form").reset();
  }
  
  //Obtener los datos de la base de datos
  
  window.addEventListener('DOMContentLoaded', async e =>{
    //console.log(e);
  
  
  try {
    const bebes = await getDocs(collection(db, "Bebes"));
    const datosContainer = document.getElementById('datos-container');
    let cont=0;
    bebes.forEach((doc) => {
      datosContainer.innerHTML+=`
      <div class="col">
      <div class="card mt-3">
            <div class="card-body">
              <div class="row">
              <div class="col-10">
              <h5 class="card-title">${doc.data().Cunero}</h5>
            </div>
            <div class="col-2">
            <button type="button" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#exampleModal${cont}">
            <i class="fas fa-info-circle"></i>
            <button type="button" class="btn ml-3 btn-danger" data-id="${doc.id}"> <i class="fas fa-trash"></i></button>
          </div>
         </div>
        </div>
      </div>
    </div>
    
    
    <div class="modal fade" id="exampleModal${cont}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">  
          <h4 class="text-center mt-3">
            <i class="fas fa-baby"></i> Información del bebé: ${doc.data().Cunero}
          </h4>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <legend class="text-dark " style="font-size: medium"><b>Nombre(s) de Padre/Madre:</b> ${doc.data().NombrePadres} </legend>
          <legend class="text-dark " style="font-size: medium"><b>Apellidos:</b> ${doc.data().ApellidoP}  ${doc.data().ApellidoM}</legend>
          <legend class="text-dark " style="font-size: medium"><b>Fecha de nacimiento:</b> ${doc.data().Fecha} </legend>
          <legend class="text-dark " style="font-size: medium"><b>Hora de nacimiento:</b> ${doc.data().Hora} </legend>
          <legend class="text-dark " style="font-size: medium"><b>Genero:</b> ${doc.data().Genero} </legend>
          <legend class="text-dark " style="font-size: medium"><b>Peso:</b> ${doc.data().Peso} Kg</legend>
        </div>
        <div class="modal-footer">
            <a href="./Datos_Médicos.html" type="button" class="btn btn-secondary" aria-pressed="true">Datos</a>
    
        </div>
      </div>
     </div>
    </div>
    `
    cont++;
    deleteDocument();
    });
  
      
  } catch (error) {
      console.log(error)
  }
  
});

  




