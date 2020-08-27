import * as Yup from 'yup';
import User from '../models/User';

import AppError from '../errors/AppError';

import InterfaceUpdateUser from '../dtos/InterfaceUpdateUser';

import UsersRepositoryInterface from '../repositories/interfaces/UsersRepositoryInterface';

export default class UpdateUserService {
  constructor(private usersRepository: UsersRepositoryInterface) {}

  public async execute({
    id,
    avatar_id,
    name,
    telephone,
  }: InterfaceUpdateUser): Promise<User> {
    const schema = Yup.object().shape({
      id: Yup.string().uuid().required(),
      avatar_id: Yup.string(),
      name: Yup.string(),
      telephone: Yup.string(),
    });

    const userInfo = { id, avatar_id, name, telephone };

    if (!(await schema.isValid(userInfo))) {
      throw new AppError('Erro na validação das informações enviadas');
    }

    if (!avatar_id && !name && !telephone) {
      throw new AppError(
        'É necessário pelo menos um parametro para atualização do usuário',
      );
    }

    const user = await this.usersRepository.update(userInfo);

    return user;
  }
}
