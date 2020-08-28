import { uuid } from 'uuidv4';

import * as Yup from 'yup';

import User from '../../models/User';
import AppError from '../../errors/AppError';
import UsersRepositoryInterface from '../interfaces/UsersRepositoryInterface';
import InterfaceCreateUserDTO from '../../dtos/InterfaceCreateUserDTO';
import InterfaceFindUser from '../../dtos/InterfaceFindUser';
import InterfaceUpdateUser from '../../dtos/InterfaceUpdateUser';

class UsersRepository implements UsersRepositoryInterface {
  private users: User[] = [];

  public async create({
    avatar_id,
    email,
    name,
    password,
    telephone,
  }: InterfaceCreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, {
      id: uuid(),
      name,
      email,
      password,
      avatar_id,
      telephone,
    });

    this.users.push(user);

    return user;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public async find({ email, id, name }: InterfaceFindUser) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      id: Yup.string().uuid(),
    });

    if (
      !(await schema.isValid({
        email,
        id,
        name,
      }))
    ) {
      throw new AppError('Erro no formato dos valores da query');
    }

    const users = this.users.filter(
      user =>
        (email && user.email === email) ||
        (id && user.id === id) ||
        (name && user.name === name),
    );

    return users;
  }

  public async checkUser(email: string): Promise<User | undefined> {
    const user = this.users.find(item => item.email === email);

    return user;
  }

  public async update({
    id,
    avatar_id,
    name,
    telephone,
  }: InterfaceUpdateUser): Promise<User> {
    const user = this.users.find(item => item.id === id);

    const userIndex = this.users.findIndex(item => item.id === id);

    if (!user) {
      throw new AppError('Id informado não consta na base de dados');
    }

    const updatedUser = {
      ...user,
      name: name || user.name,
      avatar_id: avatar_id || user.avatar_id,
      telephone: telephone || user.telephone,
    };

    this.users[userIndex] = updatedUser;

    return updatedUser;
  }
}

export default UsersRepository;
