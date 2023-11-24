import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Observable, map, tap } from "rxjs";
import { FormsMedicoViewModel } from "../models/formsMedicoViewModel";
import { VisualizarMedicoViewModel } from "../models/visualizarMedicoViewModel";
import { ListarMedicoViewModel } from "../models/listarMedicoViewModel";
import { ListarConsultaViewModel } from "../../consultas/models/ListarConsultaViewModel";
import { ListarCirurgiaViewModel } from "../../cirurgias/models/ListarCirurgiaViewModel";

@Injectable()
export class MedicosService {
private MEDICOS_API_URL = `${environment.API_URL}/medicos`;

  constructor(private http: HttpClient) {}

  criar(medico: FormsMedicoViewModel): Observable<FormsMedicoViewModel> {
    return this.http.post<FormsMedicoViewModel>(this.MEDICOS_API_URL, medico);
  }

  editar(id: string, Medico: FormsMedicoViewModel): Observable<FormsMedicoViewModel> {
    const url = `${this.MEDICOS_API_URL}/${id}`;

    return this.http.put<FormsMedicoViewModel>(url, Medico);
  }

  excluir(id: string): Observable<any> {
    const url = `${this.MEDICOS_API_URL}/${id}`;

    return this.http.delete<VisualizarMedicoViewModel>(url);
  }

  selecionarPorId(id: string): Observable<VisualizarMedicoViewModel> {
    const url = `${this.MEDICOS_API_URL}/visualizacao-completa/${id}`;

    return this.http.get<any>(url)
    .pipe(map(res => res.dados));
  }

  selecionarTodos(): Observable<ListarMedicoViewModel[]> {
    return this.http.get<any>(this.MEDICOS_API_URL)
    .pipe(map(res => res.dados),tap(x => console.log(x)));
  }

  selecionarConsultasMedico(id: string): Observable<ListarConsultaViewModel[]> {
    const url = `${this.MEDICOS_API_URL}/visualizar-medico-consultas/${id}`;

    return this.http.get<any>(url)
    .pipe(map(res => res.dados));
  }

  selecionarCirurgiasMedico(id: string): Observable<ListarCirurgiaViewModel[]> {
    const url = `${this.MEDICOS_API_URL}/visualizar-medico-cirurgias/${id}`;

    return this.http.get<any>(url)
    .pipe(map(res => res.dados));
  }
}