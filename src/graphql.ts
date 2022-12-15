
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface AddUserArgs {
    name: string;
    email: string;
    password: string;
}

export interface LoginUserArgs {
    email: string;
    password: string;
}

export interface RemoveUserArgs {
    email: string;
}

export interface User {
    name: string;
    email: string;
    password: string;
}

export interface IQuery {
    index(): string | Promise<string>;
    getAllUsers(): User[] | Promise<User[]>;
}

export interface IMutation {
    addUsers(addUsersArgs: AddUserArgs): string | Promise<string>;
    loginUser(loginUsersArgs: LoginUserArgs): string | Promise<string>;
    RemoveUser(removeUsersArgs: RemoveUserArgs): Nullable<string> | Promise<Nullable<string>>;
}

type Nullable<T> = T | null;
