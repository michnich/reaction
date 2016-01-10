Template.profile.helpers({
  isUser: function(){
    return Meteor.user().username === Router.current().params.username
  },

});
Template.profile.events({
  "submit .first-name": function (event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    var first_name = event.target.first_name.value;

    // Insert a task into the collection
    Meteor.users.update(Meteor.userId(),
    {$set: {'profile.first_name': first_name}}
    );

    // Clear form
    event.target.first_name.value = "";
  },

  "submit .last-name": function (event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    var last_name = event.target.last_name.value;

    // Insert a task into the collection
    Meteor.users.update(Meteor.userId(),
    {$set: {'profile.last_name': last_name}}
    );
    // Clear form
    event.target.last_name.value = "";
  },

  "submit .about": function (event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    var about = event.target.about.value;

    // Insert a task into the collection
    Meteor.users.update(Meteor.userId(),
    {$set: {'profile.about': about}}
    );
    // Clear form
    event.target.about.value = "";
  },

  "submit .username": function (event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    var username = event.target.username.value;

    // Insert a task into the collection
    Meteor.users.update(Meteor.userId(),
    {$set: {'username': username}}
    );
    // Clear form
    event.target.username.value = "";
  }


});
