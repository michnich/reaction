Template.profile.rendered = function(){
  if (Meteor.user().profile.first_name == undefined){
    Modal.show('editProfile');
  } else {
    // Modal.hide('editProfile');
  }
}

Template.profile.helpers({
  isUser: function(){
    return Meteor.user().profile.name === Router.current().params.username
  },
  isOwner: function(){
    return Roles.userIsInRole(Meteor.userId(),['dashboard','owner','admin']);
  },
  username: function(){
    return Router.current().params.username
  },
  //super important function that allows us to index the current user that is showed in closet
  firstName: function(){
    var email = Router.current().params.username;
    return Meteor.users.findOne({"emails.address": email}).profile.first_name;
  },
  aboutYou: function(){
    var email = Router.current().params.username;
    return Meteor.users.findOne({"emails.address": email}).profile.about;
  },
  products: function(){
    return userProducts.find({author: Router.current().params.username}).fetch()
  },
  isVerified: function(){
    return Meteor.user().emails[0].verified
  }
});
Template.profile.events({
  "submit .idUpdate": function (event){
  //   event.preventDefault();
  //   newId = $('#productId').val();
  //
  //   Meteor.call('updateId', newId);
  }
});
Template.editProfile.events({

  "submit .closetinfo": function (event) {
    // Prevent default browser form submit
    event.preventDefault();
    // Get value for first name
    var first_name = $('#firstName').val();
    // var first_name = event.target.first_name.value;

    // Get value from last name
    var last_name = $('#lastName').val();

    // Get value from about info
    var about = $('#aboutYou').val();

    // // Insert a task into the collection
    Meteor.users.update(Meteor.userId(),
    {$set: {
      'profile.first_name': first_name,
      'profile.last_name': last_name,
      'profile.about': about
      }
    }
    );


    // hide modal
    Modal.hide('editProfile');

  }
});
