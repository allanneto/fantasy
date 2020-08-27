import User from '../../models/User';

import InterfaceCreateUserDTO from '../../dtos/InterfaceCreateUserDTO';
import InterfaceFindUser from '../../dtos/InterfaceFindUser';
import InterfaceUpdateUser from '../../dtos/InterfaceUpdateUser';

export default interface UsersRepositoryInterface {
  create(data: InterfaceCreateUserDTO): Promise<User>;
  checkUser(email: string): Promise<User | undefined>;
  update(data: InterfaceUpdateUser): Promise<User>;
  find(params: InterfaceFindUser): Promise<User[]>;
}
