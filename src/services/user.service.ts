import { hash, genSalt } from 'bcrypt';

import {
  InitialUserCreation,
  IUser,
  IUserService,
} from '@interfaces/user.interface';
import { UserRepository } from '@repositories/user.repository';

export class UserService implements IUserService {
  private userRepository;
  //private JWT_SECRET = process.env['JWT_SECRET'];

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

  private validateUserData(userData: InitialUserCreation): boolean {
    if (!userData || !userData.email || !userData.password) return false;
    return true;
  }
}
