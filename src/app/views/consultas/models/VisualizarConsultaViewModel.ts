import { ListarMedicoViewModel } from "../../medicos/models/listarMedicoViewModel";

export type VisualizarConsultaViewModel = {
  id: string;
  titulo: string;
  data: Date;
  horaInicio: Date;
  horaTermino: Date;
  medico: ListarMedicoViewModel;
}