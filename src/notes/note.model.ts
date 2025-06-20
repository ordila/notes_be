import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Note {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  content: string;

  @Field(() => [String], { nullable: true })
  tags?: string[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
