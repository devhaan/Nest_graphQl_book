
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface AddBookArgs {
    id: number;
    title: string;
    price: number;
}

export interface Book {
    id: number;
    title: string;
    price?: Nullable<number>;
}

export interface IQuery {
    index(): string | Promise<string>;
    getAllBooks(): Book[] | Promise<Book[]>;
}

export interface IMutation {
    addBooks(addBooksArgs: AddBookArgs): string | Promise<string>;
}

type Nullable<T> = T | null;
