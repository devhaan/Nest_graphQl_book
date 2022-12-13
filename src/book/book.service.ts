import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book, BookDocument } from './entity/books.entity';

@Injectable()
export class BookService {
  constructor(@InjectModel(Book.name) private bookModel: Model<BookDocument>) {}
  async create(book: Book) {
    const createdBook = new this.bookModel(book);
    createdBook.save();
    return 'Stored successfully';
  }

  findAll(): Promise<Book[]> {
    return this.bookModel.find().exec();
  }
}

//adaada
