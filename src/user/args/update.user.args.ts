import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateUserArgs {
  @Field({ nullable: true })
  name: string;
  @Field({ nullable: false })
  email: string;
  @Field({ nullable: true })
  password: string;
}
