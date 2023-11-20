import { VisualizarMedicoViewModel } from "../../medicos/models/visualizarMedicoViewModel";

export type FormsConsultaViewModel = {
  titulo: string;
  horaInicio: Date;
  horaTermino: Date;
  medico: VisualizarMedicoViewModel;
  medicoId: string;
}