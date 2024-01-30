import { FormGroup } from '@angular/forms';

declare module '@angular/forms' {
  interface FormGroup {
    validate(): string[];
  }
}

FormGroup.prototype.validate = function () {
  const erros: string[] = [];

  for (let campo of Object.keys(this.controls)) {
    const controle = this.get(campo);

    if (!controle?.errors) continue;

    controle.markAsTouched();

    for (let erro of Object.keys(controle.errors)) {
      switch (erro) {
        case 'required':
          erros.push(campo === 'medicoId' ? 'É necessário ter um médico!' : `O campo ${campo} é obrigatório`);
          break;

        case 'email':
          erros.push(`O campo ${campo} deve seguir um formato válido`);
          break;

        case 'pattern':
          if (campo === 'telefone') {
            erros.push(`O campo ${campo} deve estar no formato correto!`);
          }
          else if (campo === 'crm') {
            erros.push(`O campo ${campo} deve estar no formato correto!`);
          }
            break;
      }
    }
  }

  return erros;
};
