import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

describe('Create User', () => {
  it('should be able to create a new User', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUser = new CreateUserService(fakeUsersRepository);

    const user = await createUser.execute({
      name: 'Marcoshow',
      email: 'marquinhos.rei.dastarefas@hotmail.com',
      password: 'naoseilavarlouça',
      telephone: '19999999999',
    });

    expect(user).toHaveProperty('id');
  });

  it('must be able to receive a user creation error', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUser = new CreateUserService(fakeUsersRepository);

    try {
      await createUser.execute({
        name: 'Marcoshow',
        email: 'marquinhos.rei.delas@hotmail.com',
        password: 'mlkchavedacomunidade',
        telephone: '19999999999',
        avatar_id: 'invalid_uuid',
      });
    } catch (e) {
      expect(e).toHaveProperty('message');
    }
  });
});
