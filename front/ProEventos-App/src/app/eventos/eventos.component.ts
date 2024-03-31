import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {
  larguraImagem: number = 150;
  margemImagem: number = 2;
  mostrarImagem: boolean = false;
  private _filtroLista: string = '';
  public eventosFiltrados: any = [];
  public eventos: any = [];

  public get filtroLista(): string
  {
    return this._filtroLista;
  }

  public set filtroLista(value){
    this._filtroLista = value;
    this.eventosFiltrados = this.filtroLista ? this.filtrarEventos(this.filtroLista) : this.eventos
  }

  filtrarEventos(filtrarPor: string): any
  {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    console.log(filtrarPor);
    return this.eventos.filter(
      (evento: {tema: string, local: string})=> evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1 ||
        evento.local.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  alterarImagem = () => {
    this.mostrarImagem = !this.mostrarImagem;
  }

  constructor (private http: HttpClient){

  }

  ngOnInit(): void {
    this.getEventos();
  }

  public getEventos(): void {
    this.http.get('https://localhost:5001/api/eventos')
    .subscribe(
      response => {
        this.eventos = response;
        this.eventosFiltrados = this.eventos;
      },
      error => console.log(error)
    );
  }
}
