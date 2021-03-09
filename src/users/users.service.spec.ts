import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model, Document } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { UsersService } from './users.service';

interface IUser {
  _id;
  name;
  username;
  password;
}

interface IUserDoc extends Document {
  name,
  username,
  password,
}

const mockUser = (
  _id = 'a uuid',
  name = 'Test name',
  username = 'Test username',
  password = 'Test password',
): IUser => ({
  _id,
  name,
  username,
  password,
});

const mockUserDoc = (mock?: Partial<IUser>): Partial<IUserDoc> => ({
  _id: mock?._id || 'a uuid',
  name: mock?.name || 'Test name',
  username: mock?.username || 'Test username',
  password: mock?.password || 'Test password',
});

const userArray = [
  mockUser(),
  mockUser('new uuid1', 'Vitani', 'us 1', 'pass1'),
  mockUser('new uuid2', 'Simba', 'us 2', 'pass2'),
];

const userDocArray = [
  mockUserDoc(),
  mockUserDoc({ _id: 'new uuid1', name: 'Vitani', username: 'us 1', password: 'pass1' }),
  mockUserDoc({ _id: 'new uuid2', name: 'Simba', username: 'us 2', password: 'pass2' }),
];

describe('UsersService', () => {
  let service: UsersService;
  let userModel: Model<UserDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, { provide: getModelToken(User.name), useValue: {
        new: jest.fn().mockResolvedValue(mockUser()),
        constructor: jest.fn().mockResolvedValue(mockUser()),
        find: jest.fn(),
        findOne: jest.fn(),
        update: jest.fn(),
        create: jest.fn(),
        remove: jest.fn(),
        exec: jest.fn(),
      } }],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userModel = module.get(getModelToken(User.name));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all users', async () => {
    jest.spyOn(userModel, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(userDocArray),
    } as any);
    const users = await service.findAll();
    expect(users).toEqual(userArray);
  });
});
