import { UsersService } from '../../users/users.service';
export class Initializer {
  static async initAdmin() {
    await UsersService.initAdmin({
      username: 'adminuser',
      password: '123456',
      role: 'admin'
    });
  }
  constructor() {}
}
