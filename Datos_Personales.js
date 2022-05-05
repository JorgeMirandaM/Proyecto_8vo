
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, query, where,getDoc } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-firestore.js";

import { db } from './firebase.js';

const datosContainer = document.getElementById('datos-container');
let bebes = [];
const cuneros = query(collection(db, "Cuneros"), where("Disponibilidad", "==", "Disponible"));
const select = document.getElementById('Cuneros');
let list = [];
var parentElement = document.getElementById('enfermedades');
let enfermedades = [];

window.onload = function () {
  var carga = document.getElementById('contenedor_carga');
  carga.style.visibility = 'hidden';
  carga.style.opacity = '0';
}

function babyCards(doc, cont) {
  datosContainer.innerHTML += `
    <div class="col">
    <div class="card mt-3">
          <div class="card-body">
            <div class="row">
            <div class="col-10">
            <h5 class="card-title">Cunero ${doc.data().Cunero}</h5>
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
          <i class="fas fa-baby"></i> Información del bebé: Cunero ${doc.data().Cunero}
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
}

//Añadir los cuneros disponibles a la lista 
function addOptions(list) {
  for (let value in list) {
    var option = document.createElement("option");
    option.text = (list[value]);
    select.add(option);
  }
}

function addCheckBox(value){
  
  var check = document.createElement("input");
  check.id = "flexCheckDefault";
  check.type="checkbox"; 
  //check.className="form-check-input"
  var name = document.createElement("label");
  name.className="form-check-label"
  name.for = "flexCheckDefault";
  parentElement.appendChild(check);
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
      addCheckBox(doc.data().Nombre);
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

  ////////////////////////////////////

  limpiarFormulario();
});


//Metodo para eliminar
function deleteDocument() {
  const btns = document.querySelectorAll('.btn-danger');
  btns.forEach(btn => {
    btn.addEventListener('click', async (e) => {

      //Actualizar cunero a disponible
      const docRef = doc(db, "Bebes", e.target.dataset.id);
      const docSnap = await getDoc(docRef);
      console.log(docSnap.data().Cunero);
      
      
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
      console.log(e.target.dataset.id);
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

//Resetear formulario
function limpiarFormulario() {
  document.getElementById("information-form").reset();
}










