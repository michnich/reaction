Template.profile.rendered = function(){
  if (Meteor.user().profile.first_name == undefined){
    Modal.show('editProfile');
  } else {
    modal.hide('editProfile');
  }
}

Template.profile.helpers({
  isUser: function(){
    return Meteor.user().profile.name === Router.current().params.username
  },
  username: function(){
    return Router.current().params.username
  },
  //super important function that allows us to index the current user that is showed in closet
  firstName: function(){
    var email = Router.current().params.username;
    return Meteor.users.findOne({"emails.address": email}).profile.first_name;
  },
  products: function(){
    return userProducts.find({author: Router.current().params.username}).fetch()
  }
});
Template.editProfile.events({

  "submit .closetinfo": function (event) {
    // Prevent default browser form submit
    event.preventDefault();
    // Get value for first name
    var first_name = event.target.first_name.value;
    // var first_name = event.target.first_name.value;

    // Get value from last name
    var last_name = event.target.last_name.value;

    // Get value from about info
    var about = event.target.about.value;

    // // Insert a task into the collection
    Meteor.users.update(Meteor.userId(),
    {$set: {
      'profile.first_name': first_name,
      'profile.last_name': last_name,
      'profile.about': about
      }
    }
    );

    Modal.hide()

    // Clear form

  }
});
