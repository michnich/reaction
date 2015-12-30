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
