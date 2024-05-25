import { User, UserAlreadyExistsError, UserRepository } from '../../domain';
import { CreateUserInputDto, UserDto } from '../dto';
import { Hash } from '../interfaces';

export class RegisterUserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hash: Hash,
  ) {}

  public async register(input: CreateUserInputDto): Promise<UserDto> {
    const [alreadyExistsByEmail, alreadyExistsByCpf, alreadyExistsByUsername] =
      await Promise.all([
        this.userRepository.hasByEmail(input.email),
        this.userRepository.hasByCpf(input.cpf),
        this.userRepository.hasByUsername(input.username),
      ]);

    if (alreadyExistsByEmail || alreadyExistsByCpf || alreadyExistsByUsername) {
      throw new UserAlreadyExistsError({
        email: alreadyExistsByEmail,
        cpf: alreadyExistsByCpf,
        username: alreadyExistsByUsername,
      });
    }

    const password = Password.create(input.password);
    const hashedPassword = await this.hash.make(password.value);
    const user = User.create({ ...input, hashedPassword });
    await this.userRepository.save(user);
    return new UserDto(user.id.id, user.email.value, user.username.value);
  }
}
