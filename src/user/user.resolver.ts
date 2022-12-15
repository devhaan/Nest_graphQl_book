import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { User } from './user.schema';
import { User as UserModel } from '../graphql';
import { UserService } from './user.service';
import { AddUserArgs } from './args/add.user.args';
import { LoginUserArgs } from './args/login.user.args';
import { RemoveUserArgs } from './args/remove.user.args';

// import { LogoutUserArgs } from './args/logout.user.args';
// @Resolver('User') in case of schema first
@Resolver((of) => User)
export class UserResolver {
  constructor(private readonly UserService: UserService) {}
  //   @Query('Users') in case of schema first
  @Query((returns) => [User], { name: 'getAllUsers' })
  getAllUsers() {
    return this.UserService.findAll();
  }

  @Mutation((returns) => String, { name: 'addUsers' })
  addUsers(@Args('addUsersArgs') addUserArgs: AddUserArgs) {
    return this.UserService.create(addUserArgs);
  }
  @Mutation((returns) => String, { name: 'loginUser' })
  loginUser(@Args('loginUsersArgs') loginArgs: LoginUserArgs) {
    return this.UserService.login(loginArgs);
  }

  @Mutation((returns) => String, { nullable: true })
  RemoveUser(@Args('removeUsersArgs') removeArgs: RemoveUserArgs) {
    return this.UserService.remove(removeArgs);
  }

  // @Mutation((returns) => String, { name: 'logoutUser' })
  // logoutUser(@Args('logoutUsersArgs') logoutArgs: LogoutUserArgs) {
  //   return this.UserService.login(logoutArgs);
  // }
}
