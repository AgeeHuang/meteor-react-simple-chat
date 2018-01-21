import React, { Component } from 'react';
import Member from './Member';

export default class MemberList extends Component {
  renderList() {
    const { memberList, pendingMemberList } = this.props;
    if (pendingMemberList) {
      return memberList.map(v =>
        <Member key={v._id} member={v} />
      );
    }
    return (<div>Loading</div>);
  }
  render() {
    return (
      <div className="member-list">
        { this.renderList() }
      </div>
    );
  }
}
