import { ListarMedicoViewModel } from "../../medicos/models/listarMedicoViewModel";

export type FormsCirurgiaViewModel = {
  titulo: string;
  data: Date;
  horaInicio: Date;
  horaTermino: Date;
  medicosSelecionados: string[];
}