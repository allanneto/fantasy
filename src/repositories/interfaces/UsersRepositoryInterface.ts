import User from '../../models/User';

import InterfaceCreateUserDTO from '../../dtos/InterfaceCreateUserDTO';

export default interface UsersRepositoryInterface {
  create(data: InterfaceCreateUserDTO): Promise<User>;
  // checkUser(email: string): Promise<User | undefined>;
}
