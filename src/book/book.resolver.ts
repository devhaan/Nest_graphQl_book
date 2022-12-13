import { Resolver, Query } from '@nestjs/graphql';
import { Book } from './book.schema';
import { Book as BookModel } from '../graphql';
// @Resolver('Book') in case of schema first
@Resolver((of) => Book)
export class BookResolver {
  //   @Query('books') in case of schema first
  @Query((returns) => [Book], { name: 'books' })
  getAllBooks() {
    const arr: BookModel[] = [
      { id: 1, title: 'harry1', price: 400 },
      { id: 2, title: 'harry2', price: 4200 },
      { id: 3, title: 'harry3', price: 45500 },
    ];
    return arr;
  }
}
