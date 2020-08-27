import { Router } from 'express';
import UsersRepository from '../repositories/UsersRepository';

import CreateUserService from '../services/CreateUserService';
import UpdateUserService from '../services/UpdateUserService';

const usersRouter = Router();

usersRouter.post('/', async (req, res) => {
  const usersRepository = new UsersRepository();

  const createUser = new CreateUserService(usersRepository);

  const user = await createUser.execute(req.body);

  return res.json(user);
});

usersRouter.post('/:id', async (req, res) => {
  const usersRepository = new UsersRepository();
  const updateUser = new UpdateUserService(usersRepository);

  const { id } = req.params;

  const user = await updateUser.execute({
    ...req.body,
    id,
  });

  return res.json(user);
});

usersRouter.get('/', async (req, res) => {
  const usersRepository = new UsersRepository();

  const users = await usersRepository.find(req.query);

  return res.json(users);
});

export default usersRouter;
