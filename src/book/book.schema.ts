import { ObjectType, Field, Int } from '@nestjs/graphql';
@ObjectType()
export class Book {
  @Field((type) => Int, { nullable: false })
  id: number;

  @Field({ nullable: false })
  title: string;

  @Field((type) => Int, { nullable: true })
  price: number;
}
