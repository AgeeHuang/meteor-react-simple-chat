import { Accounts } from 'meteor/accounts-base';

export const createUser = (username, password) => {
  Accounts.createUser(
    {
      username,
      password,
      email: '',
      profile: {
        name: 'Nash',
        position: 'SG',
      },
    },
    (...result) => {
      console.log(result);
      return 'success';
    }
  );
}