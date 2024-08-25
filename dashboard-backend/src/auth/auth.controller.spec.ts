import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

describe('AuthController', () => {
  let authController: AuthController;
  let usersService: UsersService;

  const mockUsersService = {
    findByUsername: jest.fn(),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    usersService = module.get<UsersService>(UsersService);
  });
    // scenario 1: username or password missing
  describe('login', () => {
    it('should return an error if username or password is missing', async () => {
      const result = await authController.login({ username: '', password: '' });
      expect(result).toEqual({ Status: false, message: 'Username and password are required' });
    });

    // scenario 2: user not exist
    it('should return an error if the user does not exist', async () => {
      mockUsersService.findByUsername.mockResolvedValue(null);
      const result = await authController.login({ username: 'user', password: 'pass' });
      expect(result).toEqual({ Status: false, message: 'Invalid username or password' });
    });

    // scenario 3: Wrong password
    it('should return an error if the password does not match', async () => {
      mockUsersService.findByUsername.mockResolvedValue({ userid: 1, password: 'hashedPassword' });
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);
      const result = await authController.login({ username: 'shweta', password: 'abcd' });
      expect(result).toEqual({ Status: false, message: 'Invalid username or password' });
    });

    // scenario 4: Usename and password is correct
    it('should return user data on successful login', async () => {
      mockUsersService.findByUsername.mockResolvedValue({ userid: 1, password: 'hashedPassword' });
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);
      mockUsersService.findOne.mockResolvedValue({ userid: 2, username: 'user' });
      const result = await authController.login({ username: 'shweta', password: 'password' });
      expect(result).toMatchObject({ Status: true, message: 'Login successfully' });
    });
  });
});
