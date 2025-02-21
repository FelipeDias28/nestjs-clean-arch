import { validateSync } from 'class-validator'
import {
  FieldsErrors,
  ValidatorFieldsInterface,
} from './validator-fields.interface'

export abstract class ClassValidatorFields<PropsValidated>
  implements ValidatorFieldsInterface<PropsValidated>
{
  errors: FieldsErrors | null = null
  validatedData: PropsValidated | null = null

  validate(data: any): boolean {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const errors = validateSync(data)
    if (errors.length) {
      this.errors = {}
      for (const error of errors) {
        const field = error.property

        if (error.constraints) {
          this.errors[field] = Object.values(error.constraints)
        }
      }
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      this.validatedData = data
    }
    return !errors.length
  }
}
