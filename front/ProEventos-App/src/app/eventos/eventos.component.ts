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
  filtroLista: string = '';

  alterarImagem = () => {
    this.mostrarImagem = !this.mostrarImagem;
  }

  public eventos: any = [];

  constructor (private http: HttpClient){

  }

  ngOnInit(): void {
    this.getEventos();
  }

  public getEventos(): void {
    this.http.get('https://localhost:5001/api/eventos')
    .subscribe(
      response => this.eventos = response,
      error => console.log(error)
    );
  }
}
