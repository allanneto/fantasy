import User from '../../models/User';

import InterfaceCreateUserDTO from '../../dtos/InterfaceCreateUserDTO';
import InterfaceFindUser from '../../dtos/InterfaceFindUser';

export default interface UsersRepositoryInterface {
  create(data: InterfaceCreateUserDTO): Promise<User>;
  checkUser(email: string): Promise<User | undefined>;
  find(params: InterfaceFindUser): Promise<User[]>;
}
