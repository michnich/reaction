
Meteor.methods({
  profile: function(){
    Meteor.users.update(Meteor.userId(),
    {$set: {'profile.name': 'default'}}
    );
  }
});
