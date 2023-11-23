import { ListarMedicoViewModel } from "../../medicos/models/listarMedicoViewModel";

export type FormsCirurgiaViewModel = {
  titulo: string;
  horaInicio: Date;
  horaTermino: Date;
  medicosSelecionados: string[];
}