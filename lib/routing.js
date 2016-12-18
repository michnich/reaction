var ReactionController;

ReactionController = ShopController.extend({
  layoutTemplate: "layout",
  //removed userProducts and directory subscriptions
});


ProfileController = ReactionController.extend({
    layoutTemplate:"profile",
    waitOn:function(){
        return Meteor.subscribe("userProfileById", this.params.userId); //isn't actually a username, is email address
        return Meteor.subscribe('userProductsByUser', this.params.userId);
    },
    // data:function(){
    //     var username=Router.current().params.username;
    //     return Meteor.users.findOne({
    //         username:username
    //     });
    // },
});

ProductController = ReactionController.extend({
  waitOn: function() {
    //return Meteor.subscribe("userProducts");
    return Meteor.subscribe('Products');
    //return Meteor.subscribe("directory");
  }
});


Router.map(function() {
  return this.route("shop", {
    controller: ProductController,
    loadingTemplate: "loading",
    path: "/products",
    subscriptions: function () {
      //fixes only showing 12 images on first page
      this.subscribe("Products", Session.get("productScrollLimit"));
    }
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
    controller:ProfileController,
    path: "/profile/:userId",
    loadingTemplate: "loading",
  });
});
Router.map(function() {
  return this.route("addProduct", {
    controller: ReactionController,
    loadingTemplate: "loading",
    //removed
    /*waitOn:function(){
        return Meteor.subscribe('userProducts');
    },*/
    path: '/add-product'
  });
});
/*Router.map(function() {
  return this.route("sell", {
    controller: ReactionController,
    loadingTemplate: "loading",
    path: '/sell'
  });
});*/
Router.map(function() {
  return this.route("home", {
    controller: ReactionController,
    loadingTemplate: "loading",
    path: '/home'
  });
});
Router.map(function() {
  return this.route("faq", {
    controller: ReactionController,
    loadingTemplate: "loading",
    path: '/faq'
  });
});
Router.map(function() {
  return this.route("contact", {
    controller: ReactionController,
    loadingTemplate: "loading",
    path: '/contact'
  });
});
Router.map(function() {
  return this.route("terms", {
    controller: ReactionController,
    loadingTemplate: "loading",
    path: '/terms-of-use'
  });
});
Router.map(function() {
  return this.route("style", {
    controller: ReactionController,
    loadingTemplate: "loading",
    path: '/style-guide'
  });
});
Router.map(function() {
  return this.route("rules", {
    controller: ReactionController,
    loadingTemplate: "loading",
    path: '/rules'
  });
});