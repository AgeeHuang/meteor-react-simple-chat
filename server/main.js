import { Meteor } from 'meteor/meteor';
import { ServiceConfiguration } from 'meteor/service-configuration';
import '../imports/startup/server';

Meteor.startup(() => {
  ServiceConfiguration.configurations.upsert({
    service: "facebook"
  }, {
    $set: {
      appId: '',
      loginStyle: "popup",
      secret: '',
    }
  });
});

