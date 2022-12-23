
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

export interface UpdateUserArgs {
    name?: Nullable<string>;
    email: string;
    password?: Nullable<string>;
}

export interface User {
    name: string;
    email: string;
    password: string;
}

export interface IQuery {
    index(): string | Promise<string>;
    getAllUsers(): User[] | Promise<User[]>;
    getAllUsersId(id: string): User | Promise<User>;
}

export interface IMutation {
    addUsers(addUsersArgs: AddUserArgs): string | Promise<string>;
    loginUser(loginUsersArgs: LoginUserArgs): string | Promise<string>;
    RemoveUser(removeUsersArgs: RemoveUserArgs): Nullable<string> | Promise<Nullable<string>>;
    updateUsers(updateUsersArgs: UpdateUserArgs): Nullable<User> | Promise<Nullable<User>>;
}

type Nullable<T> = T | null;
