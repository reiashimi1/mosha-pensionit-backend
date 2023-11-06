import { Injectable } from '@nestjs/common';
const saltRounds = Number(8);
import * as bcrypt from 'bcrypt';

@Injectable()
export class LoginService {
  private email: string;
  private password: string;

  login = (username, password): boolean => {
    // let hashedPassword;
    // this.getHashedPassword(password).then(
    //   (result) => (hashedPassword = result),
    // );
    // console.log(hashedPassword);
    if (
      username === 'rizaashimi' &&
      bcrypt.compareSync(
        password,
        '$2b$08$OpgMvfdoA.olpTXjOcHrQeISC/kvrW4v8DDmSFFZHvdpNbGEO3ld6',
      )
    ) {
      return true;
    }
    return false;
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
