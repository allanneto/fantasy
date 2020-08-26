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
    const userInfo = {
      email,
      name,
      avatar_id,
      password,
      telephone,
    };

    const user = this.ormRepository.create(userInfo);

    await this.ormRepository.save(user);

    return user;
  }
}

export default UsersRepository;
