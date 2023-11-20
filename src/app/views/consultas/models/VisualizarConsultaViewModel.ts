import { ListarMedicoViewModel } from "../../medicos/models/listarMedicoViewModel";

export type VisualizarConsultaViewModel = {
  id: string;
  titulo: string;
  horaInicio: Date;
  horaTermino: Date;
  medico: ListarMedicoViewModel;
}