import { hash, genSalt, compare } from 'bcrypt';
import jwt from 'jsonwebtoken';

import {
  InitialUserCreation,
  IUser,
  IUserService,
  UserCredentials,
} from '@interfaces/user.interface';
import { UserRepository } from '@repositories/user.repository';
import { Result } from '@interfaces/api.interface';
import { generateResult } from 'utils/generateResult';

export class UserService implements IUserService {
  private userRepository;
  private JWT_SECRET = process.env.JWT_SECRET;

  constructor() {
    this.userRepository = new UserRepository();
  }

  public async getUsers(): Promise<IUser[]> {
    return this.userRepository.FindAll();
  }

  public async createUserAccount(
    userData: InitialUserCreation
  ): Promise<Omit<IUser, 'password' | 'last_session'>> {
    if (!this.validateUserData(userData))
      throw new Error('Todos los campos obligatorios');

    try {
      const salt = await genSalt();
      const hashedPassword = await hash(userData.password, salt);

      const data = {
        email: userData.email,
        password: hashedPassword,
        name: userData.name,
        last_name: userData.last_name,
      };

      const { password, last_session, ...userWithoutPassword } =
        await this.userRepository.Create(data);

      return userWithoutPassword;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error al intentar crear el usuario: ${error.message}`);
      } else {
        throw new Error(
          `Se produjo un error desconocido al intentar crear el usuario: ${error}`
        );
      }
    }
  }

  public async login(
    userCredentials: UserCredentials
  ): Promise<Result<string>> {
    if (!userCredentials.email && !userCredentials.password) {
      throw new Error('Las credenciales son obligatorias');
    }

    try {
      const user = await this.userRepository.FindByEmail(
        userCredentials?.email
      );

      if (!user) return generateResult(false, 'El email no está registrado');

      const isValidUserPassword = await compare(
        userCredentials.password,
        user.password!
      );

      if (!isValidUserPassword)
        return generateResult(false, 'La constraseña no es correcta');

      const { created_at, password, ...payload } = user;
      const token = jwt.sign(payload, this.JWT_SECRET!, { expiresIn: '8h' });

      await this.userRepository.UpdateLastSession(user.id);

      return generateResult(true, null, token);
    } catch (error) {
      return generateResult(false, `Error inesperado: ${error}`);
    }
  }

  private validateUserData(userData: InitialUserCreation): boolean {
    if (!userData || !userData.email || !userData.password) return false;
    return true;
  }
}
