import { ClassValidatorFields } from '../../class-validator-fields'
import * as lassValidator from 'class-validator'

class StubClassValidatorFields extends ClassValidatorFields<{
  field: string
}> {}

describe('ClassValidatorFields Unit Tests', () => {
  it('Should initialize erros and validatedData variables with null', () => {
    const sut = new StubClassValidatorFields()

    expect(sut.errors).toBeNull()
    expect(sut.validatedData).toBeNull()
  })

  it('Should validate with errors', () => {
    // Criando um mock de um método
    const spyValidateSync = jest.spyOn(lassValidator, 'validateSync')
    spyValidateSync.mockReturnValue([
      { property: 'field', constraints: { isRequired: 'test error' } },
    ])

    const sut = new StubClassValidatorFields()

    expect(sut.validate(null)).toBeFalsy()
    expect(spyValidateSync).toHaveBeenCalled() // O método precisa ter sido chamado
    expect(sut.validatedData).toBeNull()
    expect(sut.errors).toStrictEqual({ field: ['test error'] })
  })

  it('Should validate without errors', () => {
    // Criando um mock de um método
    const spyValidateSync = jest.spyOn(lassValidator, 'validateSync')
    spyValidateSync.mockReturnValue([])

    const sut = new StubClassValidatorFields()

    expect(sut.validate({ field: 'value' })).toBeTruthy()
    expect(spyValidateSync).toHaveBeenCalled() // O método precisa ter sido chamado
    expect(sut.validatedData).toStrictEqual({ field: 'value' })
    expect(sut.errors).toBeNull()
  })
})
