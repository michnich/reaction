// Template.layoutHeader.events({
//   'click .profile-button':function(event){
//     if (Meteor.user().emails[0].address.length > 1){
//       alert('email is set');
//       var username = prompt("set username");
//       Meteor.users.update(Meteor.userId(),
//       {$set: {'username': username}}
//       );
//     }
//
//   }
// });


Template.layoutHeader.onRendered(function(){

  Meteor.subscribe("allUserData");
  Meteor.typeahead.inject();
  $('.typeahead').bind('typeahead:select', function(ev, suggestion){
    console.log('Selection: ' , suggestion.value);
    Router.go('/profile/'+ suggestion.value);
  });
});

Template.layoutHeader.helpers({
  username: function(){
    return Meteor.user().profile.name;
  },
  usernames: function(){
    return Meteor.users.find().fetch().map(function(user){
      if (user.profile.name == undefined){
        Meteor.users.update(Meteor.userId(),
        {$set: {'profile.name': 'default'}}
        );
      } else {
        return user.profile.name;
      }
    });
  }
});
