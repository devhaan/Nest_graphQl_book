import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './entity/User.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RemoveUserArgs } from './args/remove.user.args';
import { UpdateUserArgs } from './args/update.user.args';

@Injectable()
export class UserService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(User.name) private UserModel: Model<UserDocument>,
  ) {}
  async create(userArg) {
    // if (
    //   user['password'] != undefined &&
    //   user['confirmPassword'] != undefined &&
    //   user['password'] != user['confirmPassword']
    // ) {
    //   throw new Error('Pass/ConFirm Pass must be same');
    // }
    const query = { email: userArg['email'] };
    const userData = await this.findOne(query);
    if (userData[0].length > 0) {
      return 'Already Register please Login';
    }
    const hashedPassword = await bcrypt.hash(userArg['password'], 12);

    const user = {
      name: userArg.name,
      email: userArg.email,
      password: hashedPassword,
    };
    const createdUser = new this.UserModel(user);
    createdUser.save();
    delete user.password;
    return 'added Successfully';
  }

  findAll(): Promise<User[]> {
    return this.UserModel.find().exec();
  }
  async findOne(query: object) {
    const userData = await this.UserModel.find({ query });
    return userData[0];
  }
  async update(updateArgs: UpdateUserArgs) {
    const UserData = await this.UserModel.findOneAndUpdate(
      { email: updateArgs.email },
      updateArgs,
    )
      .clone()
      .catch(function (err) {
        console.log(err);
      });

    return UserData;
  }

  remove(removeArgs: RemoveUserArgs) {
    this.UserModel.findOneAndRemove(
      { email: removeArgs.email },
      function (err, docs) {
        if (err) {
          return err;
        } else {
          return `Removed User ${docs}`;
        }
      },
    );
    return 'done';
  }
  async login(loginArgs) {
    const query = { email: loginArgs.email };

    const userData = await this.findOne(query);
    if (userData[0].length == 0) {
      return 'Invalid User/ Please SignUp first';
    }

    if (!(await bcrypt.compare(loginArgs.password, userData[0].password))) {
      return 'Invalid Credential';
    }

    const jwt = await this.jwtService.signAsync({ _id: userData[0].id });
    return jwt;
  }

  // logout(logoutArgs) {
  //   this.jwtService.sign(logoutArgs, '', { expiresIn: 1 }, (logout, err) => {
  //     if (logout) {
  //       return 'You have been Logged Out';
  //     } else {
  //       return 'Error';
  //     }
  //   });
  // }
}
