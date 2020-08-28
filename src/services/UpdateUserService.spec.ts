import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateUserService from './UpdateUserService';
import CreateUserService from './CreateUserService';

describe('Update User', () => {
  it('must be able to update user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUser = new CreateUserService(fakeUsersRepository);
    const updateUser = new UpdateUserService(fakeUsersRepository);

    const { id } = await createUser.execute({
      name: 'Marcoshow',
      email: 'marquinhos.rei.dastarefas@hotmail.com',
      password: 'naoseilavarlouça',
      telephone: '19999999999',
    });

    const user = await updateUser.execute({
      id,
      name: 'Marcos Moraes',
      telephone: '19366631231',
    });

    expect(user).toHaveProperty('name', 'Marcos Moraes');
  });

  it('must be able to receive a update user error', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const updateUser = new UpdateUserService(fakeUsersRepository);

    try {
      const user = await updateUser.execute({
        id: '23123',
        name: 'Marcos Moraes',
        telephone: '19366631231',
      });
    } catch (error) {
      expect(error).toHaveProperty(
        'message',
        'Erro na validação das informações enviadas',
      );
    }
  });

  it('must be able to update user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUser = new CreateUserService(fakeUsersRepository);
    const updateUser = new UpdateUserService(fakeUsersRepository);

    const { id } = await createUser.execute({
      name: 'Marcoshow',
      email: 'marquinhos.rei.dastarefas@hotmail.com',
      password: 'naoseilavarlouça',
      telephone: '19999999999',
    });

    try {
      const user = await updateUser.execute({
        id,
      });
    } catch (error) {
      expect(error).toHaveProperty(
        'message',
        'É necessário pelo menos um parametro para atualização do usuário',
      );
    }
  });
});
