import { getRepository, Repository } from 'typeorm';

import * as Yup from 'yup';

import InterfaceCreateUserDTO from '../dtos/InterfaceCreateUserDTO';
import User from '../models/User';

import UsersRepositoryInterface from './interfaces/UsersRepositoryInterface';

class UsersRepository implements UsersRepositoryInterface {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async create({
    email,
    name,
    avatar_id,
    password,
    telephone,
  }: InterfaceCreateUserDTO): Promise<User> {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      name: Yup.string().required(),
      avatar_id: Yup.string().uuid().required(),
      password: Yup.string().min(8).required(),
      telephone: Yup.string().min(11).required(),
    });

    const user = {
      id: 'sada',
      email,
      name,
      avatar_id,
      password,
      telephone,
      created_at: new Date(),
      updated_at: new Date(),
    };

    return user;
  }
}

export default UsersRepository;
