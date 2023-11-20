import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Observable, map, tap } from "rxjs";
import { FormsCirurgiaViewModel } from "../models/FormsCirurgiaViewModel";
import { VisualizarCirurgiaViewModel } from "../models/VisualizarCirurgiaViewModel";
import { ListarCirurgiaViewModel } from "../models/ListarCirurgiaViewModel";


@Injectable()
export class CirurgiasService {
private CIRURGIAS_API_URL = `${environment.API_URL}/cirurgias`;

  constructor(private http: HttpClient) {}

  criar(cirurgia: FormsCirurgiaViewModel): Observable<FormsCirurgiaViewModel> {
    return this.http.post<FormsCirurgiaViewModel>(this.CIRURGIAS_API_URL, cirurgia);
  }

  editar(id: string, cirurgia: FormsCirurgiaViewModel): Observable<FormsCirurgiaViewModel> {
    const url = `${this.CIRURGIAS_API_URL}/${id}`;

    return this.http.put<FormsCirurgiaViewModel>(url, cirurgia);
  }

  excluir(id: string): Observable<any> {
    const url = `${this.CIRURGIAS_API_URL}/${id}`;

    return this.http.delete<VisualizarCirurgiaViewModel>(url);
  }

  selecionarPorIdCompleto(id: string): Observable<VisualizarCirurgiaViewModel> {
    const url = `${this.CIRURGIAS_API_URL}/visualizacao-completa/${id}`;

    return this.http.get<any>(url)
    .pipe(map(res => res.dados));
  }

  selecionarPorId(id: string): Observable<FormsCirurgiaViewModel> {
    const url = `${this.CIRURGIAS_API_URL}/${id}`;

    return this.http.get<any>(url)
    .pipe(map(res => res.dados));
  }

  selecionarTodos(): Observable<ListarCirurgiaViewModel[]> {
    return this.http.get<any>(this.CIRURGIAS_API_URL)
    .pipe(map(res => res.dados));
  }
}