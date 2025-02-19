export type FieldsErrors = {
  /**
   *  Um campo pode ter vários erros: name = obrigatório, string, 255
   * E para cada campo uma mensagem de erro diferente
   **/
  [field: string]: string[]
}

export interface ValidatorFieldsInterface<PropsValidated> {
  errors: FieldsErrors // Tipo do retorno do erro
  validaData: PropsValidated // Os dados recebidos
  validate(data: any): boolean // Função de validação que retorna se estão ou não validado
}
