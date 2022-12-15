import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './entity/User.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RemoveUserArgs } from './args/remove.user.args';

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
    const userData = await this.findOne(userArg['email']);
    if (userData.length > 0) {
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
    return 'added Sucessfully';
  }

  findAll(): Promise<User[]> {
    return this.UserModel.find().exec();
  }
  findOne(email: string) {
    return this.UserModel.find({ email: email }).exec();
  }
  update() {
    return this.UserModel.findOneAndUpdate();
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
    const userData = await this.findOne(loginArgs.email);
    if (userData.length == 0) {
      return 'Invalid User/ Please SignUp first';
    }

    if (!(await bcrypt.compare(loginArgs.password, userData[0].password))) {
      return 'Invalid Credential';
    }

    const jwt = await this.jwtService.signAsync({ id: userData[0].id });
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
