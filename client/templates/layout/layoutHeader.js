Template.layoutHeader.events({
  'click .profile-button':function(event){
    if (Meteor.user().profile == undefined){
      Meteor.users.update(Meteor.userId(),{$set: {'profile.name': Meteor.user().emails[0].address}});
      Router.go('/profile/' + Meteor.user().emails[0].address);

    }

  }
});


Template.layoutHeader.onRendered(function(){

  // $('.profile-button').on('click', function(){
  //   if (Meteor.user().profile == undefined){
  //     Meteor.users.update(Meteor.userId(),{$set: {'profile.name': Meteor.user().emails[0].address}});
  //   }
  //   });

  
  //on click close menu
  $('.nav-item').on('click',function(){
    $('.navbar-collapse').removeClass('in');
  });
  Meteor.subscribe("allUserData");
  Meteor.typeahead.inject();
  $('.typeahead').bind('typeahead:select', function(ev, suggestion){
    console.log('Selection: ' , suggestion.value);
    Router.go('/profile/'+ suggestion.value);
  });
});

Template.layoutHeader.helpers({
  username: function(){
    return Meteor.user().emails[0].address
  },
  profileImage: function(){
    return Meteor.user().profile.profile_pic
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
