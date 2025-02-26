// Regras cruciais de negócio, razão de ser do software

import { Entity } from '@/shared/domain/entities/entity'
import { UserValidatorfactory } from '../validators/user.validator'

export type UserProps = {
  name: string
  email: string
  password: string
  createdAt?: Date // Ao criar um usuário a pessoa não precisa informar a data de criação, ela será preenchida automaticamente
}

export class UserEntity extends Entity<UserProps> {
  constructor(
    public readonly props: UserProps,
    id?: string,
  ) {
    UserEntity.validate(props)
    super(props, id)
    this.props.createdAt = this.props.createdAt ?? new Date()
  }

  update(value: string): void {
    UserEntity.validate({ ...this.props, name: value }) // Valida as propriedades da instância e altera nome
    this.name = value
  }

  updatePassword(value: string): void {
    UserEntity.validate({ ...this.props, password: value })
    this.password = value
  }

  get name() {
    return this.props.name
  }

  private set name(value: string) {
    this.props.name = value
  }

  get email() {
    return this.props.email
  }

  get password() {
    return this.props.password
  }

  private set password(value: string) {
    this.props.password = value
  }

  get createdAt() {
    return this.props.createdAt
  }

  static validate(props: UserProps) {
    const validator = UserValidatorfactory.create()
    validator.validate(props)
  }
}
