import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Observable, map, tap } from "rxjs";
import { FormsConsultaViewModel } from "../models/FormsConsultaViewModel";
import { VisualizarConsultaViewModel } from "../models/VisualizarConsultaViewModel";
import { ListarConsultaViewModel } from "../models/ListarConsultaViewModel";


@Injectable()
export class ConsultasService {
private CONSULTAS_API_URL = `${environment.API_URL}/consultas`;

  constructor(private http: HttpClient) {}

  criar(consulta: FormsConsultaViewModel): Observable<FormsConsultaViewModel> {
    return this.http.post<FormsConsultaViewModel>(this.CONSULTAS_API_URL, consulta);
  }

  editar(id: string, consulta: FormsConsultaViewModel): Observable<FormsConsultaViewModel> {
    const url = `${this.CONSULTAS_API_URL}/${id}`;

    return this.http.put<FormsConsultaViewModel>(url, consulta);
  }

  excluir(id: string): Observable<any> {
    const url = `${this.CONSULTAS_API_URL}/${id}`;

    return this.http.delete<VisualizarConsultaViewModel>(url);
  }

  selecionarPorId(id: string): Observable<VisualizarConsultaViewModel> {
    const url = `${this.CONSULTAS_API_URL}/visualizacao-completa/${id}`;

    return this.http.get<any>(url)
    .pipe(map(res => res.dados));
  }

  selecionarTodos(): Observable<ListarConsultaViewModel[]> {
    return this.http.get<any>(this.CONSULTAS_API_URL)
    .pipe(map(res => res.dados));
  }
}