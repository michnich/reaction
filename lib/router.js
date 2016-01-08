if (Meteor.isServer){
  Meteor.publish("allUserData", function () {
      return Meteor.users.find();
  });
};
