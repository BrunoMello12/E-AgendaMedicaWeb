import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Observable, map, tap } from "rxjs";
import { FormsMedicoViewModel } from "../models/formsMedicoViewModel";
import { VisualizarMedicoViewModel } from "../models/visualizarMedicoViewModel";
import { ListarMedicoViewModel } from "../models/listarMedicoViewModel";

@Injectable()
export class MedicosService {
private MEDICOS_API_URL = `${environment.API_URL}/medicos`;

  constructor(private http: HttpClient) {}

  criar(medico: FormsMedicoViewModel): Observable<FormsMedicoViewModel> {
    return this.http.post<FormsMedicoViewModel>(this.MEDICOS_API_URL, medico);
  }

  editar(id: number, Medico: FormsMedicoViewModel): Observable<FormsMedicoViewModel> {
    const url = `${this.MEDICOS_API_URL}/${id}`;

    return this.http.put<FormsMedicoViewModel>(url, Medico);
  }

  excluir(id: number): Observable<any> {
    const url = `${this.MEDICOS_API_URL}/${id}`;

    return this.http.delete<VisualizarMedicoViewModel>(url);
  }

  selecionarPorId(id: number): Observable<VisualizarMedicoViewModel> {
    const url = `${this.MEDICOS_API_URL}/${id}?_expand=medico`;

    return this.http.get<VisualizarMedicoViewModel>(url);
  }

  selecionarTodos(): Observable<ListarMedicoViewModel[]> {
    return this.http.get<any>(this.MEDICOS_API_URL)
    .pipe(map(res => res.dados));
  }
}