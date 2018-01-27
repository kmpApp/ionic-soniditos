import { Component } from '@angular/core';

//Utilizada para reordenar la lista(array)
import { reorderArray } from "ionic-angular";

//se importa el archivo
import { ANIMALES }from '../../data/data.animales';

//import interface
import { Animal }from '../../interfaces/animal.interface';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  animales:Animal[] = [];
  audio = new Audio();
  audioTiempo:any;
  orderActive:boolean = false;

//constructor
  constructor(){
    //slice crea una copia del array
    this.animales = ANIMALES.slice(0);
  }

//Reproducir Sonido
  private reproducir(a:Animal){

    this.pausarSonido(a);

    if(a.reproduciendo){
      a.reproduciendo = false;
      return;
    }

    this.audio.src = a.audio;

    this.audio.load();
    this.audio.play();

    //bandera de reproduccion
    a.reproduciendo = true;
    //se cambia el estado de reproduciendo para cambiar los iconos
    this.audioTiempo = setTimeout( ()=> a.reproduciendo =false, a.duracion * 1000  );
  }

 //Pausar Sonido
   private pausarSonido(animalSeleccionado:Animal){
     clearTimeout(this.audioTiempo);

     this.audio.pause();
     this.audio.currentTime = 0;
     animalSeleccionado.reproduciendo = false;

     for (let animal of this.animales) {
         if(animal.nombre != animalSeleccionado.nombre){
           animal.reproduciendo = false;
         }
     }
   }

//Eliminar sonido
   private borrarSonido(indx:number){
     //splice(index desde que eliminara, int cuantos eliminara)
     this.animales.splice(indx,1);
   }
//Refrescar el arreglo
   private doRefresh(refresher:any){

      setTimeout(() => {
            this.animales = ANIMALES.slice(0);
            refresher.complete();
      }, 2000);

   }
//Reordenar elementos
private reorderItems(indexsReorder:any){
  console.log(indexsReorder);
  this.animales = reorderArray(this.animales, indexsReorder);
}



}
