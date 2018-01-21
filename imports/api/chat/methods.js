import { Meteor } from 'meteor/meteor';
import { Messages, Conversation } from './collection';

export const createConversation = (id, name) => {
  let response = null;
  const ownInfo = Meteor.user();
  if (ownInfo && id) {
    response = Conversation.find(
      {
        participants: { $in: [id, ownInfo._id]},
      }
    );
    if (!response || response.length <= 0) {
      response = Conversation.insert({
        participants: [id, ownInfo._id],
        participantsMap: {
          [id]: ownInfo.username,
          [ownInfo._id]: name,
        },
        createdAt: new Date(),
      });
    }
  }
  return response;
}

export const sendMessage = (id, content) => {
  let response = Messages.insert({
    content,
    sender: Meteor.userId(),
    conversationId: id
  });

  return response;
}

export const getConversationList = () => {
  let conversationList = [];
  if (Meteor.userId()) {
    conversationList = Conversation.find(
      {
        participants: Meteor.userId(),
      }
    ).fetch();
  }
  console.log(conversationList);
  return conversationList;
}
