import { VisualizarMedicoViewModel } from "../../medicos/models/visualizarMedicoViewModel";

export type FormsConsultaViewModel = {
  titulo: string;
  data: Date;
  horaInicio: Date;
  horaTermino: Date;
  medico: VisualizarMedicoViewModel;
  medicoId: string;
  usuarioId: string;
}