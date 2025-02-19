import { validate as uuidValidate } from 'uuid'
import { Entity } from '../../entity'

// Passando qualquer valor para simular
type StubProps = {
  prop1: string
  prop2: number
}

// Classe duble -> convensão Stub
class StubEntity extends Entity<StubProps> {}

describe('Entity unit tests', () => {
  it('Should set props and id', () => {
    const props = { prop1: 'value1', prop2: 15 }
    const id = '8d5d3fa5-cfd5-4ede-81eb-a2c39cc192e3'
    const entity = new StubEntity(props)
    const entity2 = new StubEntity(props, id)

    // Mesma estrutura
    expect(entity.props).toStrictEqual(props)
    expect(entity._id).not.toBeNull()

    // Verificação que o id que foi gerado é um uuid valido
    expect(uuidValidate(entity._id)).toBeTruthy()

    // Quando informar um uuid ele verifica se é válido
    expect(uuidValidate(entity2._id)).toBeTruthy()
    expect(entity2._id).toBe(id)
  })

  // validar método toJSON
  it('Should convert to JSON', () => {
    const props = { prop1: 'value1', prop2: 15 }
    const entity = new StubEntity(props)
    expect(entity.toJSON()).toStrictEqual({
      id: entity._id,
      ...props,
    })
  })
})
