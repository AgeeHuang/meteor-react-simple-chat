import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import React from 'react';
import AppRoutes from '../common/routes';

Meteor.startup(() => {
  render(AppRoutes, document.getElementById('react-root'));
});