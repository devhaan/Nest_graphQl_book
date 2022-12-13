import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book, BookDocument } from './entity/books.entity';

@Injectable()
export class BookService {
  constructor(@InjectModel(Book.name) private BookModel: Model<BookDocument>) {}
}
