import { ForbiddenException, Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private nextId = 2;
  private readonly users = [
    {
      id: 1,
      name: 'Guévork',
      email: 'guevork@estiam.com',
      password: 'azerty',
    },
  ];

  createUser(userData: any): any {
    const newUser = {
      id: this.nextId,
      ...userData,
    };

    this.nextId++;

    this.users.push(newUser);
    return newUser;
  }

  connect(userInfo: any): string {
    const { email, password } = userInfo;

    const userFound = this.users.find((user) => {
      return user.email === email && user.password === password;
    });

    if (!userFound) {
      throw new ForbiddenException();
    }

    // Simulation d'une création de Token
    const token = Buffer.from(`${email}/${password}`).toString('base64');
    return token;
  }
}
