// Template.layoutHeader.events({
//   'click .profile-button':function(event){
//     if (Meteor.user().emails[0].address.length > 1){
//       alert('email is set');
//       var username = prompt("set username");
//       var profileName = Meteor.user().profile.name;
//       Meteor.users.update(Meteor.userId(),
//       {$set: {profileName: username}}
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

      var userProfile = user.profile;

      var amountOfUser = Meteor.users.find().fetch().length;


      for(var i= 0; i <= amountOfUser; i++){
        if (userProfile !== undefined) {
          return user.profile.name;
          console.log(user);
        }
      }

      // if (user.profile.name == undefined){
      //   // Meteor.users.update(Meteor.userId(),
      //   // {$set: {'profile.name': 'default'}}
      //   // );
      //   this.
      // } else {
      //   return user.profile.name;
      // }
    });
  }
});
