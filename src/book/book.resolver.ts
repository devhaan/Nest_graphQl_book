import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Book } from './book.schema';
import { Book as BookModel } from '../graphql';
import { BookService } from './book.service';
import { AddBookArgs } from './args/add.book.args';
// @Resolver('Book') in case of schema first
@Resolver((of) => Book)
export class BookResolver {
  constructor(private readonly bookService: BookService) {}
  //   @Query('books') in case of schema first
  @Query((returns) => [Book], { name: 'getAllBooks' })
  getAllBooks() {
    return this.bookService.findAll();
  }

  @Mutation((returns) => String, { name: 'addBooks' })
  addBooks(@Args('addBooksArgs') addBookArgs: AddBookArgs) {
    return this.bookService.create(addBookArgs);
  }
}
