import * as Yup from 'yup';
import { hash } from 'bcryptjs';
import User from '../models/User';
import UsersRepositoryInterface from '../repositories/interfaces/UsersRepositoryInterface';

import AppError from '../errors/AppError';

interface Request {
  email: string;
  password: string;
  name: string;
  telephone: string;
  avatar_id?: string;
}

export default class CreateUserService {
  constructor(private usersRepository: UsersRepositoryInterface) {}

  public async execute({
    email,
    name,
    password,
    telephone,
    avatar_id,
  }: Request): Promise<User> {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      name: Yup.string().required(),
      avatar_id: Yup.string().uuid(),
      password: Yup.string().min(8).required(),
      telephone: Yup.string().min(11).required(),
    });

    const userInfo = {
      email,
      name,
      password,
      telephone,
      avatar_id,
    };

    const validate = await schema.isValid(userInfo);

    if (!validate) {
      throw new AppError('Falha na validação dos campos');
    }

    const hashedpassword = await hash(password, 8);

    const userDTO = {
      ...userInfo,
      password: hashedpassword,
    };

    const user = await this.usersRepository.create(userDTO);

    return user;
  }
}
