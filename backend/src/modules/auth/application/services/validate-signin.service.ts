import { UnauthorizedError, UserRepository } from '../../domain';
import { CredentialsDto, SessionDto, UserDto } from '../dto';
import { AccessTokenProvider, Hash } from '../interfaces';

export class ValidateSigninService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly accessTokenProvider: AccessTokenProvider,
    private readonly hash: Hash,
  ) {}

  public async execute(credentials: CredentialsDto): Promise<SessionDto> {
    const user = await this.userRepository.findByEmail(credentials.email);

    if (!user) {
      throw new UnauthorizedError();
    }

    const passwordMatch = await this.hash.compare(
      credentials.password,
      user.hashedPassword,
    );

    if (!passwordMatch) {
      throw new UnauthorizedError();
    }

    const dto = new UserDto(user.id.id, user.email.value, user.username.value);
    const accessToken = this.accessTokenProvider.generateToken(dto);
    return new SessionDto(accessToken);
  }
}
