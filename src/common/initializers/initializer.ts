import { UsersService } from '../../users/users.service';

export class Initializer {
  static async initAdminUser() {
    await UsersService.initAdmin({
      email: 'admin@app.com',
      password: "123456",
      role: 'admin'
    });
  }
  constructor() {}
}
