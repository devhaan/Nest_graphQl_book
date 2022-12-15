import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class LoginUserArgs {
  @Field()
  token: string;
}
