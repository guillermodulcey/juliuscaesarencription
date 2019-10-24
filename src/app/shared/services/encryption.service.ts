import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {

  expresionRegular = new RegExp('[a-z]');
  caracteres = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','x','y','z'];
  frases: string[] = [];
  puntaje: number[] = [];
 
  //constructor
  constructor() { }

  //Reconocer el caracter
  caracterCambiable(caracter: string): Boolean{
    return this.expresionRegular.test(caracter);
  }

  //Obtener la letra correspondiente
  obtenerNuevaPosicion(posicion: number, llave: number): number{
    return (posicion+llave)%this.caracteres.length;
  }

  //Buscar un caracter en caracter
  buscarCaracter(caracter: string): number{
    for (let index = 0; index < this.caracteres.length; index++) {
      const elemento = this.caracteres[index];
      if(elemento === caracter){
        return index;
      }
    }
  }

  //Cambiar el caracter
  cambiarCaracter(caracter: string, llave: number): string{
    if (this.caracterCambiable(caracter)) {
      let posicion =this.obtenerNuevaPosicion(this.buscarCaracter(caracter),llave);
      return this.caracteres[posicion];
    } else {
      return caracter;
    }
  }

  //Cambiar frase
  cambiarFrase(frase: string, llave: number): string{
    let nuevaFrase: string = "";
    for (let index = 0; index < frase.length; index++) {
      const element = frase.charAt(index);
      
      nuevaFrase += this.cambiarCaracter(element,llave);
    }
    return nuevaFrase;
  }

  //Iterar por las posibles soluciones
  iterarSoluciones(frase: string): string[]{
    let soluciones: string[] = []
    for (let index = 0; index < this.caracteres.length; index++) {
      soluciones.push(this.cambiarFrase(frase,index));
    }
    return soluciones;
  }

  //Cuenta cuantas palabras NO están en inglés
  palabrasIngles(frase: string): number{
    var data = null;
    var xhr = new XMLHttpRequest();

    let peticion = this.convertirFraseAPeticion(frase);

    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === this.DONE) {
         console.log(Object.keys(JSON.parse(this.responseText)["corrections"]).length);
      }
    });

    if(peticion !== ""){
      xhr.open("GET", "https://montanaflynn-spellcheck.p.rapidapi.com/check/?text="+peticion,false);
      xhr.setRequestHeader("x-rapidapi-host", "montanaflynn-spellcheck.p.rapidapi.com");
      xhr.setRequestHeader("x-rapidapi-key", "7f41ff7529msh58bffd254bd5397p117ab7jsnca88c2d58e3a");
      xhr.send(data);
      
    }
    return Object.keys(JSON.parse(xhr.responseText)["corrections"]).length;
  }

  //Convertir la frase a una peticion GET http
  convertirFraseAPeticion(frase: string): string{
    return frase.replace(/ /g,"%20");
  }

  //Obtener puntaje de las frases
  obtenerPuntajes(frases: string[]): number[]{
    let puntaje: number[] = [];
    frases.forEach(elemento => {
      puntaje.push(this.palabrasIngles(elemento));
    });
    return puntaje;
  }

  //Intercambiar elementos
  intercambiarElemento(arreglo: any[], izquierda: number, derecha: number){
    let temporal = arreglo[izquierda];
    arreglo[izquierda] = arreglo[derecha];
    arreglo[derecha] = temporal;
  }

  //Particiones del quick sort
  particiones(arreglo: any[], izquierda: number, derecha: number): number{
   let pivote = arreglo[derecha];
   let i = (izquierda - 1);
   for (let j = izquierda; j < derecha; j++) {
     if (arreglo[j] < pivote) {
       i++;
       this.intercambiarElemento(arreglo,i,j);
       this.intercambiarElemento(this.frases,i,j);
     }
   }
   this.intercambiarElemento(arreglo,i+1,derecha);
   this.intercambiarElemento(this.frases,i+1,derecha);

   return i+1;
  }

  //Implementación quick sort
  quickSort(arreglo: any[], izquierda: number, derecha: number): any[]{
    let index: number;
    if (derecha > izquierda) {
      index = this.particiones(arreglo, izquierda, derecha);
      this.quickSort(arreglo,izquierda,index-1);
      this.quickSort(arreglo,index+1,derecha);
    }
    return arreglo;
  }

  //Ordenar el arreglo de puntajes
  ordenarPorPuntajes(){
    this.quickSort(this.puntaje,0,this.puntaje.length - 1);
  }

  //Obtener los resultados de procesar la frase
  obtenerResultados(frase: string){
    this.frases = this.iterarSoluciones(frase);
    this.puntaje = this.obtenerPuntajes(this.frases);
    this.ordenarPorPuntajes(); 
  }

  //Muestra si ya se tienen resultados
  mostrarSolucion(): boolean{
    return !!this.frases;
  }

}
