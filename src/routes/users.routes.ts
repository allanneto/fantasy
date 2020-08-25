import { Router } from 'express';
import UsersRepository from '../repositories/UsersRepository';

const userRouter = Router();

userRouter.get('/', async (req, res) => {
  const usersRepository = new UsersRepository();

  const user = await usersRepository.create(req.body);

  console.log(user);

  return res.json({ message: 'allexin one republikkkkkkk' });
});

export default userRouter;
