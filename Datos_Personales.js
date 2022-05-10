
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, query, where,getDoc } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-firestore.js";

import { db } from './firebase.js';

const datosContainer = document.getElementById('datos-container');
let bebes = [];
const cuneros = query(collection(db, "Cuneros"), where("Disponibilidad", "==", "Disponible"));
const select = document.getElementById('Cuneros');
let list = [];
const checkboxesElement = document.getElementById('enfermedades-check');
var enfermedad = ""; 
let enfermedades = [];
let enfermedades_2 = [];

window.onload = function () {
  var carga = document.getElementById('contenedor_carga');
  carga.style.visibility = 'hidden';
  carga.style.opacity = '0';
}

function babyCards(doc, cont) {
  datosContainer.innerHTML += 
  `
  <div>
    <div class="card mt-3">
          <div class="card-body text-center">
            <div class="Cunero">
              <h5 class="card-title">Cunero ${doc.data().Cunero}</h5>
            </div>
            <div class="d">
              <button type="button" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#exampleModal${cont}">
              <i class="fas fa-info-circle"></i>
              <button type="button" class="btn ml-3 btn-danger" data-id="${doc.id}"> <i class="fas fa-trash"></i></button>
            </div>
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
          <i class="fas fa-baby"></i> Información del bebé: Cunero ${doc.data().Cunero}
        </h4>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <legend class="text-dark " style="font-size: x-large"><b>Enfermedades:</b> ${doc.data().Enfermedades} </legend>
        <legend class="text-dark " style="font-size: medium"><b>Nombre(s) de Padre/Madre:</b> ${doc.data().NombrePadres} </legend>
        <legend class="text-dark " style="font-size: medium"><b>Apellidos:</b> ${doc.data().ApellidoP}  ${doc.data().ApellidoM}</legend>
        <legend class="text-dark " style="font-size: medium"><b>Fecha de nacimiento:</b> ${doc.data().Fecha} </legend>
        <legend class="text-dark " style="font-size: medium"><b>Hora de nacimiento:</b> ${doc.data().Hora} </legend>
        <legend class="text-dark " style="font-size: medium"><b>Genero:</b> ${doc.data().Genero} </legend>
        <legend class="text-dark " style="font-size: medium"><b>Peso:</b> ${doc.data().Peso} Kg</legend>
        <legend class="text-dark " style="font-size: medium"><b>Edad gestacional:</b> ${doc.data().Gestacion} semanas</legend>
      </div>
      <div class="modal-footer">
          <a href="./Datos_Médicos.html" type="button" class="btn btn-secondary" aria-pressed="true">Datos</a>

      </div>
    </div>
  </div>
  </div>
  `
}

//Añadir los cuneros disponibles a la lista 
function addOptions(list) {
  for (let value in list) {
    var option = document.createElement("option");
    option.text = (list[value]);
    select.add(option);
  }
}

function addCheckBox(doc){
  checkboxesElement.innerHTML += `
  <div class="form-check">
    <input class="form-check-input" type="checkbox" value="${doc.data().Nombre}" id="${doc.data().Nombre}">
    <label class="form-check-label" for="${doc.data().Nombre}">
      ${doc.data().Nombre}
    </label>
  </div>
  `
}

function reiniciar(){
  for (let i = select.options.length; i >= 0; i--) {
    select.remove(i);
  }
  list=[];
}

//Obtener los datos de la base de datos

window.addEventListener('DOMContentLoaded', async e => {
  try {
    bebes = await getDocs(collection(db, "Bebes"));
    let cont = 0;
    bebes.forEach((doc) => {
      babyCards(doc, cont);
      cont++;
      deleteDocument();
    });

    enfermedades = await getDocs(collection(db, "Enfermedades"));
    enfermedades.forEach((doc) => {
      enfermedades_2.push(doc.data().Nombre);
      addCheckBox(doc);
      deleteDocument();
    });

    const querySnapshot = await getDocs(cuneros);
    querySnapshot.forEach((doc) => {
    list.push(doc.data().Cunero);
    });
    addOptions(list);

  } catch (error) {
    console.log(error)
  }

});


//Almacenar los datos en la base de datos
const informationForm = document.getElementById('information-form');
informationForm.addEventListener('submit', async e => {
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

  //Clasificación de los bebés de acuerdo a semanas de gestación
  var clasificacion = ""; 
  if (gestacion.value >= 23 && gestacion.value <= 25){
    clasificacion = "Gran Inmaduro";
  } else if (gestacion.value > 25 && gestacion.value <= 28){
    clasificacion = "Pretérmino extremo";
  } else if (gestacion.value > 28 && gestacion.value <= 30){
    clasificacion = "Pretérmio severo";
  } else if (gestacion.value > 30 && gestacion.value <= 33){
    clasificacion = "Pretérmino moderado";
  } else if (gestacion.value > 33 && gestacion.value <= 36){
    clasificacion = "Pretérmino tardío";
  } else if (gestacion.value > 36 && gestacion.value <= 38){
    clasificacion = "Término precoz";
  } else if (gestacion.value > 38 && gestacion.value <= 41){
    clasificacion = "Término maduro";
  } else if (gestacion.value > 41){
    clasificacion = "Postérmino";
  }

  // Saber si el bebé presenta alguna enfermedad
  const check = document.getElementById("switch-enfermedades");
  if (check.checked){
    enfermedades_2.forEach(element => {
      if(document.getElementById(element).checked){
        enfermedad += element+", ";
      }
    });
    if(otro.checked){ 
      enfermedad += nuevaenfermedad.value; 
    }
  } else{
    enfermedad = "Ninguna";
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
      Gestacion:  gestacion.value,
      Clasificacion: clasificacion,
      Apgar: apgar.value,
      Enfermedades: enfermedad,
      Cunero: str
    });

    bebes = [];
    datosContainer.innerHTML = "";
    bebes = await getDocs(collection(db, "Bebes"));
    let cont = 0;
    bebes.forEach((doc) => {
      babyCards(doc, cont);
      cont++;
      deleteDocument();
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }

  //Actualizar cunero a no disponible
  const actualizar = doc(db, "Cuneros", str);
  await updateDoc(actualizar, {
    Disponibilidad: "No Disponible"
  });

  //Obtener de nuevo la lista de los cuneros disponibles
  reiniciar();
  const querySnapshot = await getDocs(cuneros);
  querySnapshot.forEach((doc) => {
    list.push(doc.data().Cunero);
  });
  addOptions(list);

  document.getElementById("information-form").reset();
  enfermedad = "";
});


//Metodo para eliminar
function deleteDocument() {
  const btns = document.querySelectorAll('.btn-danger');
  btns.forEach(btn => {
    btn.addEventListener('click', async (e) => {

      //Actualizar cunero a disponible
      const docRef = doc(db, "Bebes", e.target.dataset.id);
      const docSnap = await getDoc(docRef);
      
      
      const actualizar = doc(db, "Cuneros", docSnap.data().Cunero);
      await updateDoc(actualizar, {
        Disponibilidad: "Disponible"
      });

      reiniciar(); 
      const querySnapshot = await getDocs(cuneros);
      querySnapshot.forEach((doc) => {
      list.push(doc.data().Cunero);
      });
      addOptions(list);
      /////////////////////

      await deleteDoc(doc(db, 'Bebes', e.target.dataset.id));
      bebes = [];
      datosContainer.innerHTML = "";


      bebes = await getDocs(collection(db, "Bebes"));
      let cont = 0;
      bebes.forEach((doc) => {
        babyCards(doc, cont);
        cont++;
        deleteDocument();
      });
    })
  })
}










