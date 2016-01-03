

Template.member.helpers({
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
Template.navigation.helpers({
  usernames: function(){
    return Meteor.users.find().fetch().map(function(user){
      return user.username;
    });
  }
});
Template.member.helpers({
  id: function() {
    return this.profile.name;
  },
  avatar: function() {
    return UserImages.findOne({associatedObjectId: this._id});
  },
  imageUrl: function() {
    return UserImages.findOne({associatedObjectId: this._id}).url({store: "userImages-avatar"});
  }
});
