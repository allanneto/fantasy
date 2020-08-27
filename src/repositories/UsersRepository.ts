import { getRepository, Repository, Like } from 'typeorm';

import * as Yup from 'yup';
import InterfaceCreateUserDTO from '../dtos/InterfaceCreateUserDTO';
import InterfaceFindUser from '../dtos/InterfaceFindUser';
import InterfaceUpdateUser from '../dtos/InterfaceUpdateUser';

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

    const duplicatedUser = await this.checkUser(email);

    if (duplicatedUser) {
      throw new AppError('Já existe um usuário cadastrado com esse e-mail');
    }

    const user = this.ormRepository.create(userInfo);

    await this.ormRepository.save(user);

    return user;
  }

  public async checkUser(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ where: { email } });

    return user;
  }

  public async find({ email, id, name }: InterfaceFindUser): Promise<User[]> {
    const query = { email, id, name };

    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      id: Yup.string().uuid(),
    });

    if (!(await schema.isValid(query))) {
      throw new AppError('Erro no formato dos valores da query');
    }

    const users = await this.ormRepository.find({
      where: [{ name: Like(`%${name}%`) }, { email }, { id }],
    });

    return users;
  }

  public async update({
    id,
    avatar_id,
    name,
    telephone,
  }: InterfaceUpdateUser): Promise<User> {
    const user = await this.ormRepository.findOne(id);

    if (!user) {
      throw new AppError('Id informado não consta na base de dados');
    }

    const updatedUser = {
      ...user,
      name: name || user.name,
      avatar_id: avatar_id || user.avatar_id,
      telephone: telephone || user.telephone,
    };

    await this.ormRepository.save(updatedUser);

    return updatedUser;
  }
}

export default UsersRepository;
