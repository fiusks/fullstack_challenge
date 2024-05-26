import { Password } from '~/modules/common/domain';
import { User, UserAlreadyExistsError, UserRepository } from '../../domain';
import { CreateUserInputDto, SessionDto, UserDto } from '../dto';
import { AccessTokenProvider, Hash } from '../interfaces';

export class RegisterUserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hash: Hash,
    private readonly accessTokenProvider: AccessTokenProvider,
  ) {}

  public async execute(input: CreateUserInputDto): Promise<SessionDto> {
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
    const userDto = new UserDto(
      user.id.id,
      user.email.value,
      user.username.value,
    );
    const token = this.accessTokenProvider.generateToken(userDto);
    return new SessionDto(userDto, token);
  }
}
