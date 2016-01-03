Template.userProfile.helpers({
  username: function(){
    return Meteor.user().profile.name
  },
  email:function(){
    return Meteor.user().emails[0].address
  },
  id: function() {
  return this.profile.name;
  },
  products: function(){
    return Products.find({userId: Meteor.userId()}, {sort: {submitted: -1}});
  },
  commentsCount: function(){
    return Comments.find({productId: this._id}).count();
  }

});

Template.userProfile.events({
  "submit .new-task": function (event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    var text = event.target.text.value;

    // Insert a task into the collection
    Meteor.users.update({_id:Meteor.user()._id}, {$set:{"profile.name":text}});
    // Clear form
    event.target.text.value = "";

    Meteor.users.update(this._id, {
      $set: {profile:{name: text}}
    });
  }
});
