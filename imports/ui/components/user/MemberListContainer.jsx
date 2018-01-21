import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import MemberList from './MemberList';

const MemberListContainer = createContainer(props => {
  const pendingMemberList = Meteor.subscribe('get-user-all').ready();
  const memberList = Meteor.users.find(
    {
      _id: {
        $ne: Meteor.userId(),
      },
    },
    {
      sort: {
        createdAt: -1,
      },
    }
  ).fetch();
  // const memberList = Meteor.users.find().fetch();
  return {
    pendingMemberList,
    memberList,
    user:  Meteor.user() ? Meteor.user() : {}
  };
}, MemberList)

export default MemberListContainer;