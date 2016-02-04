// Tracker.autorun(function(){
//  if(Meteor.user().username){
//    // login handler
//    Router.go("/");
//  }
//  else{
//    // logout handler
//    Router.go("landing");
//  }
// });
// Meteor.publish('comments', function(){
//   return Comments.find({}, {sort: {submitted: -1}});
// });
Meteor.app = _.extend(Meteor.app || {}, {
  getCurrentShopCursor: function() {
    return Shops.find({}, {
      limit: 1
    });
  },
  getCurrentShop: function() {
    var cursor;
    cursor = Meteor.app.getCurrentShopCursor();
    return cursor.fetch()[0];
  }
});

Meteor.app = _.extend(Meteor.app || {}, {
  packages: {
    register: function(packageInfo) {
      return this[packageInfo.name] = packageInfo;
    }
  }
});

Meteor.app = _.extend(Meteor.app || {}, {
  shopId: null,
  isMember: false,
  isOwner: null,
  isAdmin: null,
  userPermissions: [],
  shopPermissions: [],
  shopPermissionGroups: [],
  init: function(shop) {
    var groupName, groupPermissions, i, j, len, len1, member, permissions, ref, shopPermission, usedPackage, usedPackages;
    this.shopId = shop._id;
    permissions = [];
    usedPackages = _.map(Packages.find({
      shopId: this.shopId
    }).fetch(), function(packageConfig) {
      return _.find(Meteor.app.packages, function(appPackage) {
        return packageConfig.name === appPackage.name;
      });
    });
    for (i = 0, len = usedPackages.length; i < len; i++) {
      usedPackage = usedPackages[i];
      if (usedPackage != null ? usedPackage.shopPermissions : void 0) {
        ref = usedPackage.shopPermissions;
        for (j = 0, len1 = ref.length; j < len1; j++) {
          shopPermission = ref[j];
          permissions.push(shopPermission);
        }
      }
    }
    this.shopPermissions = _.pluck(permissions, "permission");
    this.shopPermissionGroups = (function() {
      var ref1, results;
      ref1 = _.groupBy(permissions, "group");
      results = [];
      for (groupName in ref1) {
        groupPermissions = ref1[groupName];
        results.push({
          group: groupName,
          permissions: groupPermissions
        });
      }
      return results;
    })();
    this.isOwner = Meteor.userId() === shop.ownerId;
    member = _.find(shop.members, function(member) {
      return member.userId === Meteor.userId();
    });
    if (member) {
      this.isMember = true;
      this.isAdmin = member.isAdmin;
      return this.userPermissions = member.permissions;
    }
  },
  hasDashboardAccess: function() {
    return this.isMember || this.hasOwnerAccess();
  },
  hasPermission: function(permissions) {
    if (!permissions) {
      return false;
    }
    if (!_.isArray(permissions)) {
      permissions = [permissions];
    }
    return this.hasOwnerAccess() || _.intersection(permissions, this.userPermissions).length || (this.isAdmin && _.intersection(permissions, this.shopPermissions).length);
  },
  hasOwnerAccess: function() {
    return Roles.userIsInRole(Meteor.user(), "admin") || this.isOwner;
  }
});



// if (Meteor.isClient) {
//   // This code only runs on the client
//
//     // Meteor.startup(function () {
//       // Tracker.autorun(function () {
//       //   if (Meteor.user().emails == undefined ){
//       //     Meteor.users.update(Meteor.userId(),
//       //     {$set: {'profile.name': 'default'}}
//       //     );
//       //     alert('hello' + Meteor.user().profile.name);
//       //   }
//       // });
//       Tracker.autorun(function(){
//         if (Meteor.user().emails[0].address.length > 1) {
//           // Meteor.users.update(Meteor.userId(),
//           //   {$set: {'profile.name': Meteor.user().emails[0].address}}
//           // );
//         } else {
//           Meteor.users.update(Meteor.userId(),
//             {$set: {'profile.name': 'default'}}
//           );
//         }
//       });
//
//     // });
// }
if (Meteor.isClient){
  Template.products.rendered = function(){
    var pathArray = window.location.pathname.split('/');
    //return the product tag
    typeOfProduct = pathArray[3];


    if(window.location.pathname.indexOf("/product/tag/"+typeOfProduct) == 0){
      //place a jumbotron before the main container
      $("#main").prepend("<div class='jumbotron featured-banner'> <div class='text' style='text-align:center; color:black; text-shadow: 1px 1px 1px solid black'> <h1> " + typeOfProduct + "</h1></div>");
      // dynamically add the class of the tag so that the jumbotron background can change with the product tag
      $('.featured-banner').addClass(typeOfProduct);
      console.log(typeOfProduct);
    } else{
      $(".jumbotron").remove();
    }
  }
  // Tracker.autorun(function(){
  //   if($('#landing').siblings(0).hasClass('featured-banner')){
  //     $('.featured-banner').hide();
  //   }
  // });

}
Meteor.Spinner.options = {
    color: '#000', // #rgb or #rrggbb
}
