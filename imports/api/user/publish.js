import { Meteor } from 'meteor/meteor';

Meteor.publish('get-user-all', () => {
  const memberList = Meteor.users.find(
    {},
    {
      fields: {
        _id: 1,
        username: 1,
        createdAt: 1,
      },
    }
  );
  console.log(memberList);
  return memberList;
});