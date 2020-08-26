import { Router } from 'express';
import UsersRepository from '../repositories/UsersRepository';

const userRouter = Router();

userRouter.get('/', async (req, res) => {
  const usersRepository = new UsersRepository();

  const user = await usersRepository.create(req.body);

  return res.json(user);
});

export default userRouter;
