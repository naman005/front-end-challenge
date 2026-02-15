import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Role } from '../common/enums/role.enum';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Query(() => String)
    hello() {
    return 'Hello from GraphQL';
  }

  @Mutation(() => String)
  async register(
    @Args('email') email: string,
    @Args('password') password: string,
    @Args('name', { nullable: true }) name: string,
    @Args('role', { type: () => Role }) role: Role,
  ) {
    await this.authService.register(email, password, name, role);
    return 'User registered successfully';
  }
  @Mutation(() => String)
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
  ) {
    return this.authService.login(email, password);
  }

}
