import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { User as UserDomain } from '../domain/User';
import { AuthService } from '../services/AuthService';

export class Controller {
  constructor(private service: AuthService) {}

  public register = async (req: Request, res: Response): Promise<void> => {
    const { email, password, username } = req.body;
    try {
      const emailExist = await this.service.fetchByEmail(email);
      if (emailExist) {
        res.status(400).json({ status: '400', message: 'Email already exists!' });
        return;
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      await this.service.create({
        email,
        username,
        password: hashedPassword,
        status: 'PENDING',
      });

      res.status(201).json({ status: '201', message: 'User registered successfully' });
    } catch (error) {
      res.status(400).json({ status: '400', message: error });
    }
  };

  public login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    try {
      const user = await this.service.fetchByEmail(email);
      if (!user) {
        res.status(400).json({ status: '400', message: 'User not found' });
        return;
      }

      const isPasswordValid = await user.comparePassword(password);
      if (isPasswordValid) {
        const token = this.generateToken(user);
        res.status(200).json({ status: '200', message: 'Logged in successfully', token, user });
      } else {
        res.status(400).json({ status: '400', message: 'Invalid login details' });
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({ status: '400', message: error });
    }
  };

  private generateToken(user: UserDomain): string {
    return jwt.sign({ id: user.getId() }, process.env.TOKEN!);
  }
}
