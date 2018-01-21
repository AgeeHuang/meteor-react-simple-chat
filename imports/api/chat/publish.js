import { Meteor } from 'meteor/meteor';
import { Messages, Conversation } from './collection';

Meteor.publish('get-conversation-all', () => {
  const conversation = Conversation.find(
    {},
    {
      fields: {
        participants: 1,
        participantsMap: 1,
        createdAt: 1,
        conversationId: 1,
      },
    }
  );
  return conversation;
});

Meteor.publishComposite('get-conversation-message', () => {
  return {
    find: () => {
      return Conversation.find(
        {
          participants: Meteor.userId(),
        },
        {
          sort: {
            createdAt: -1,
          },
        }
      );
    },
    children: [
      {
        find: (conversation) => {
          return Meteor.users.find(
            { _id: conversation.sender },
            { fields: { username: 1 } }
          );
        }
      },
      {
        find: (conversation) => {
          return Messages.find(
            {
              conversationId: conversation._id.valueOf(),
            },
            {
              fields: {
                conversationId: 1,
                content: 1,
                sender: 1,
              },
              sort: { createdAt: -1 },
              limit: 5,
            }
          );
        }
      }
    ]
  }
});
