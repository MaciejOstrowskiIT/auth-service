import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { LoginUser } from '../models/userModel';
import { MongoService } from '../services/MongoService';

export class Controller {
  constructor(private service: MongoService) {}

  public signup = async (req: Request, res: Response): Promise<void> => {
    const { email, password, username } = req.body;

    try {
      const emailExist = await this.service.findOne({ email });
      if (emailExist) {
        res.status(400).json({ status: '400', message: 'Email already exists!' });
        return;
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      await this.service.insertOne({
        username,
        password: hashedPassword,
        email,
        accountId: null,
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
      console.log('in')
      const user = await this.service.findOne({ email });
      if (!user) {
        console.log('no user')
        res.status(400).json({ status: '400', message: 'User not found' });
        return;
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (isPasswordValid) {
        const token = this.generateToken(user);
        res.status(200).json({ status: '200', message: 'Logged in successfully', token, user });
      } else {
        console.log('wrong details')
        res.status(400).json({ status: '400', message: 'Invalid login details' });
      }

    } catch (error) {
      console.log(error)
      res.status(400).json({ status: '400', message: error });
    }
  };

  private generateToken(user: LoginUser): string {
    return jwt.sign({ email: user.email }, process.env.TOKEN!);
  }
}
