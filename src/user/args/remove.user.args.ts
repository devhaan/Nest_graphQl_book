import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveUserArgs {
  @Field({ nullable: false })
  email: string;
}
