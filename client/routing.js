var ReactionController;

ReactionController = ShopController.extend({
  layoutTemplate: "layout",
  waitOn: function() {
    return Meteor.subscribe('Products');
  }
});

Router.map(function() {
  return this.route("productsNew", {
    controller: ReactionController,
    path: "/productsNew"
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
