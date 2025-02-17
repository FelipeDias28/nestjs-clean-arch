// Regras cruciais de negócio, razão de ser do software

export type UserProps = {
  name: string
  email: string
  password: string
  createdAt?: Date // Ao criar um usuário a pessoa não precisa informar a data de criação, ela será preenchida automaticamente
}

export class UserEntity {
  constructor(public readonly props: UserProps) {
    this.props.createdAt = this.props.createdAt ?? new Date()
  }

  get name() {
    return this.props.name
  }

  get email() {
    return this.props.email
  }

  get password() {
    return this.props.password
  }

  get createdAt() {
    return this.props.createdAt
  }
}
