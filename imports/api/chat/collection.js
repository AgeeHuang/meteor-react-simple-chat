import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

let Messages = new Mongo.Collection('messages');
let Conversation = new Mongo.Collection('conversation');

Messages.schema = new SimpleSchema({
  conversationId: {
    type: String
  },
  content: {
    type: String
  },
  sender: {
    type: String
  },
  createdAt: {
    type: Date,
    autoValue: function() {
      if (this.isInsert) {
        return new Date();
      } else if (this.isUpsert) {
        return {$setOnInsert: new Date()};
      } else {
        this.unset();
      }
    }
  },
});

Messages.allow({
  insert: (id, message) => {
    return true;
  }
});

Conversation.allow({
  insert: (members) => {
    return true;
  },
  update: () => {
    return true;
  }
});

Messages.attachSchema(Messages.schema);

export { Messages, Conversation };
