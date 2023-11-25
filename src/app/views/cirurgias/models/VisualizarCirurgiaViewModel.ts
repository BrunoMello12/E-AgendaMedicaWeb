import { ListarMedicoViewModel } from "../../medicos/models/listarMedicoViewModel";

export type VisualizarCirurgiaViewModel = {
  id: string;
  titulo: string;
  data: Date;
  horaInicio: Date;
  horaTermino: Date;
  medicos: ListarMedicoViewModel[];
}