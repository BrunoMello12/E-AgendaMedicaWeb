import { ListarMedicoViewModel } from "../../medicos/models/listarMedicoViewModel";

export type VisualizarCirurgiaViewModel = {
  id: string;
  titulo: string;
  horaInicio: Date;
  horaTermino: Date;
  medicos: ListarMedicoViewModel[];
}