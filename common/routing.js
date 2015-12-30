/**
 * Reaction App Router
 * Define general app routing.
 * ReactionCore common/routing.js contains the core routes.
 */

let staticPages = ["about", "team", "faqs", "terms", "privacy" ];

/**
 * app router mapping
 */
Router.map(function route() {
  for (let page of staticPages) {
    this.route(page, {
      controller: ShopController,
      name: page
    });
  }
  return this.route("notFound", {
    path: "/(.*)"
  });
});
Router.map(function route() {
  _.extend(Router.routes.index.options, {
    // Just an example. You can put any Iron Router options here.
    template: 'landingPro'
  });
});

// var requireLogin = function(pause) {
//   if (! Meteor.user().username) {
//     if (Meteor.loggingIn())
//       this.render(this.loadingTemplate);
//     else
//       this.render('landing');
//   } else {
//     this.next();
//   }
// }
//
// Router.onBeforeAction(requireLogin, {except: ['landing']});
