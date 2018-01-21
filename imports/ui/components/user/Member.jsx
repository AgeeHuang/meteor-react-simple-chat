import React, { Component } from 'react';
import { createConversation } from '../../../api/chat/methods';

export default class Member extends Component {
  sendMessage(target) {
    createConversation(target._id, target.username);
  }
  render() {
    const { member } = this.props;
    return (
      <div
        className="member-contact"
      >
        {member.username}
        <i
          onClick={ this.sendMessage.bind(this, member) }
          className="fa fa-commenting"
          aria-hidden="true"
        />
      </div>
    );
  }
}