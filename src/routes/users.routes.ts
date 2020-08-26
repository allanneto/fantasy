import { Router } from 'express';
import UsersRepository from '../repositories/UsersRepository';

import CreateUserService from '../services/CreateUserService';

const userRouter = Router();

userRouter.post('/', async (req, res) => {
  const usersRepository = new UsersRepository();

  const createUser = new CreateUserService(usersRepository);

  const user = await createUser.execute(req.body);

  return res.json(user);
});

userRouter.get('/', async (req, res) => {
  const usersRepository = new UsersRepository();

  console.log(req.query);

  const users = await usersRepository.find(req.query);

  return res.json(users);
});

export default userRouter;
