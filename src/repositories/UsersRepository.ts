import { getRepository, Repository } from 'typeorm';

import InterfaceCreateUserDTO from '../dtos/InterfaceCreateUserDTO';
import User from '../models/User';

import UsersRepositoryInterface from './interfaces/UsersRepositoryInterface';

import AppError from '../errors/AppError';

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

  public async checkUser(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ where: { email } });

    return user;
  }
}

export default UsersRepository;
