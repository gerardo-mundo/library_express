import { IUser } from '@interfaces/user.interface';
import { UserRepository } from 'repositories/user/user.repository';

export class UserService {
  private userRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  public async getUsers(): Promise<IUser[]> {
    return this.userRepository.FindAll();
  }
  public async createUserAccount(userData: IUser) {
    this.userRepository.Create(userData);
  }
}
