var ReactionController;

ReactionController = ShopController.extend({
  layoutTemplate: "layout",
  waitOn: function() {
    return Meteor.subscribe('Products');
  }
});


ProfileController=ReactionController.extend({
    layoutTemplate:"profile",
    waitOn:function(){
        return Meteor.subscribe("allUserData");
        return Meteor.subscribe("userProfile",this.params.username);
    },
    data:function(){
        var username=Router.current().params.username;
        return Meteor.users.findOne({
            username:username
        });
    }
});



Router.map(function() {
  return this.route("productsNew", {
    controller: ReactionController,
    path: "/products"
  });
});
Router.map(function() {
  return this.route("userProfile", {
    controller: ReactionController,
    path: "/profile"
  });
});
Router.map(function() {
  return this.route("featuredCloset", {
    controller: ReactionController,
    path: "/featured-closet"
  });
});
Router.map(function() {
  return this.route("works", {
    controller: ReactionController,
    path: "/how-it-works"
  });
});

Router.map(function() {
  return this.route("profile", {
    path: "/profile/:username",
    controller:ProfileController
  });
});
Router.map(function() {
  return this.route("featuredCloset", {
    path: "/featured-closet",
    controller:ProfileController
  });
});
