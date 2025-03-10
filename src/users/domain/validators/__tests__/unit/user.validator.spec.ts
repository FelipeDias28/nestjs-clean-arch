import { UserDataBuilder } from '@/users/domain/testing/helpers/user-data-builder'
import {
  UserRules,
  UserValidator,
  UserValidatorfactory,
} from '../../user.validator'

let sut: UserValidator

describe('UserValidator unit test', () => {
  beforeEach(() => {
    sut = UserValidatorfactory.create()
  })

  describe('Name field', () => {
    it('invalidaton cases for name field', () => {
      let isValid = sut.validate(null as any)
      expect(isValid).toBeFalsy()
      expect(sut?.errors?.['name']).toStrictEqual([
        'name should not be empty',
        'name must be a string',
        'name must be shorter than or equal to 255 characters',
      ])

      isValid = sut.validate({
        ...UserDataBuilder({}),
        name: '',
      })
      expect(isValid).toBeFalsy()
      expect(sut?.errors?.['name']).toStrictEqual(['name should not be empty'])

      isValid = sut.validate({
        ...UserDataBuilder({}),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        name: 10 as any,
      })
      expect(isValid).toBeFalsy()
      expect(sut?.errors?.['name']).toStrictEqual([
        'name must be a string',
        'name must be shorter than or equal to 255 characters',
      ])

      isValid = sut.validate({
        ...UserDataBuilder({}),
        name: 'a'.repeat(256),
      })
      expect(isValid).toBeFalsy()
      expect(sut?.errors?.['name']).toStrictEqual([
        'name must be shorter than or equal to 255 characters',
      ])
    })

    it('valid cases for name field', () => {
      const props = UserDataBuilder({})
      const isValid = sut.validate(props)
      expect(isValid).toBeTruthy()
      expect(sut.validatedData).toStrictEqual(new UserRules(props))
    })
  })
})
