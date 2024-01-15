import { Injectable } from '@nestjs/common';
const saltRounds = Number(8);
import * as bcrypt from 'bcrypt';

type LoginType = {
  isLoggedIn: boolean;
  firstName?: string;
  message: string;
  token?: string;
};

@Injectable()
export class LoginService {
  private email: string;
  private password: string;

  login = (username, password): LoginType => {
    // let hashedPassword;
    // this.getHashedPassword(password).then(
    //   (result) => (hashedPassword = result),
    // );
    // console.log(hashedPassword);
    if (
      username === 'rizaashimi' &&
      bcrypt.compareSync(
        password,
        '$2b$08$T/G8zxsOovKstleQJtip9OQ2hOeLtdUbcRmWeTyFvg/vmtYjZCErG',
      )
    ) {
      return {
        isLoggedIn: true,
        firstName: 'Riza',
        message: 'Logged in successfully',
        token: 'r$2b$08$T/G8zxsOovKstleQJtip9OQ2hOeLtdUbcRmWeTyFvg/vmtYjZCErGa',
      };
    }
    return { isLoggedIn: false, message: 'Kredencialet jane te gabuara' };
  };

  private getHashedPassword = async (password: string): Promise<string> => {
    console.log(password);
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);
    console.log(hashedPassword);
    console.log(
      bcrypt.compareSync(
        password,
        '$2b$08$nMtq/sEwSSajoLTya2Mf8eQ7b7Y3Z0mzQUYG5d56VH5IIBO8ASgoi',
      ),
    );
    return hashedPassword;
  };
}
