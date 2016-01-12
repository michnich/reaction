Template.layoutHeader.events({
  'click .profile-button':function(event){
    if (Meteor.user().emails[0].address.length > 1){
      alert('email is set');
      var username = prompt("set username");
      Meteor.users.update(Meteor.userId(),
      {$set: {'username': username}}
      );
    }

  }
});
