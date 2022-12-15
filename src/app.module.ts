import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { UserModule } from './user/user.module';
import { join } from 'path';
import { AppResolver } from './app.resolver';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      playground: true, //not for production (make false)
      autoSchemaFile: join(process.cwd(), 'src/schema.graphql'), // use it when u want code first
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
      }, //if we do this it will create interface which helps us to handle errors in terms of sending data properly in structure
      //typePaths: ['./**/*.graphql'],// use it when you want schema first and made schema by own
    }),
    MongooseModule.forRoot(
      'mongodb+srv://devhaan:dev07dev@cluster0.2i6yqc9.mongodb.net/user?retryWrites=true&w=majority',
    ),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppResolver],
})
export class AppModule {}
