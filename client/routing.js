var ReactionController;

ReactionController = ShopController.extend({
  layoutTemplate: "layout",
  waitOn: function() {
    return Meteor.subscribe('Products');
    return Meteor.subscribe("directory");
    return Meteor.subscribe('userProducts');

  }
});


ProfileController=ReactionController.extend({
    layoutTemplate:"profile",
    waitOn:function(){
        return Meteor.subscribe("allUserData");
        return Meteor.subscribe("directory");
        return Meteor.subscribe("userProfile",this.params.username);
        return Meteor.subscribe('userProducts');

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
    loadingTemplate: "loading",
    path: "/products"
  });
});
// Router.map(function() {
//   return this.route("profile", {
//     controller: ReactionController,
//     data: function(){
//       var username=Meteor.user().profile.name
//       return username;
//     },
//     path: "/profile/:username"
//   });
// });
Router.map(function() {
  return this.route("featuredCloset", {
    controller: ReactionController,
    loadingTemplate: "loading",
    path: "/featured-closet"
  });
});
Router.map(function() {
  return this.route("aboutUs", {
    controller: ReactionController,
    loadingTemplate: "loading",
    path: "/about-us"
  });
});
Router.map(function() {
  return this.route("works", {
    controller: ReactionController,
    loadingTemplate: "loading",
    path: "/how-it-works"
  });
});

Router.map(function() {
  return this.route("profile", {
    path: "/profile/:username",
    loadingTemplate: "loading",
    waitOn:function(){

        return Meteor.subscribe('userProducts');

    },
    controller:ProfileController
  });
});
Router.map(function() {
  return this.route("addProduct", {
    controller: ReactionController,
    loadingTemplate: "loading",
    waitOn:function(){
        return Meteor.subscribe('userProducts');

    },
    path: '/add-product'
  });
});
Router.map(function() {
  return this.route("sell", {
    controller: ReactionController,
    loadingTemplate: "loading",
    path: '/sell'
  });
});
Router.map(function() {
  return this.route("home", {
    controller: ReactionController,
    loadingTemplate: "loading",
    path: '/home'
  });
});
