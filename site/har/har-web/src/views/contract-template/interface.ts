export interface IFormModel {
  id?: string;
  content: string;
  name: string;
}

export class FormModel implements IFormModel{
  name = '';
  content = '';
}
