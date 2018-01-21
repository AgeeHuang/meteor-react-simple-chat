import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { withRouter } from "react-router-dom";

import { Messages, Conversation } from '../../../api/chat/collection';
import { sendMessage, getConversationList } from '../../../api/chat/methods';

const ChatBox = ({
  pending,
  messages,
  conversationList,
  children,
}) => (
  <div>
    {
      pending ?
        conversationList.map(result =>
          <Chat
            key={result._id}
            data={result}
            messages={messages}
          />
        ) : null
    }
    { children }
  </div>
)

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }
  keyPress(event, conversationId) {
    if (event.keyCode == 13) {
      sendMessage(conversationId, event.target.value);
      this.setState({
        message: '',
      })
    }
  }
  render() {
    const { message } = this.state;
    const { data, messages } = this.props;
    messages.slice(0,5);
    return (
      <div className="chat-section">
        <h3>
          {
            data ?
              data.participantsMap[Meteor.userId()]
              : 'nobody'
          }
        </h3>
        <div className="chat-box">
          {
            messages.map((m, i) =>
              <div
                key={i}
                className={
                  m.sender === Meteor.userId() ?
                    'owner' :
                    null
                }
              >
                <div className="clear-message">
                  <p>{m.content}</p>
                </div>
              </div>
            )
          }
        </div>
        <input
          type="text"
          name="message"
          value={message}
          onKeyDown={event => this.keyPress(event, data._id.valueOf())}
          onChange={this.handleInputChange}
        />
      </div>
    );
  }
}

const ChatContainer = createContainer(props => {
  const pending = Meteor.subscribe('get-conversation-message').ready();
  const conversationList = Conversation.find().fetch();
  const messages = Messages.find().fetch();
  console.log(messages);
  return {
    pending,
    messages,
    conversationList,
    children: props.children,
  };
}, ChatBox);

export default withRouter(ChatContainer);
