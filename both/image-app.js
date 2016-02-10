var bucketUrl = Meteor.settings.public.bucketUrl;


if (Meteor.isServer) {
  var accessKeyId = Meteor.settings.accessKeyId;
  var secretAccessKey = Meteor.settings.secretAccessKey;
  var bucketName = Meteor.settings.bucketName;

  Meteor.publish("users", function() {
    return Meteor.users.find({});
  });

}

ImageUpload.configure({
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey,
  bucketName: bucketName,
  bucketUrl: bucketUrl
});

UserImages = ImageUpload.createCollection("userImages", Meteor.users, {
  defaultPermissions: true,
  publicRead: true,
  sizes: {
    // normal: [800,800],
    thumbnail: [200, 200]
    // avatar: [50, 50]
  }
});

if (Meteor.isServer) {
  UserImages.allow({
    insert: function(userId, doc) {
      return !!userId;
    },
    update: function(userId, doc) {
      /*
       * User can update their own image only
       */
      return doc && doc.addedBy === userId;
    },
    remove: function(userId, doc) {
      /*
       * User can remove their own image only
       */
      return doc && doc.addedBy === userId;
    },
    download: function(userId, fsFile) {
      /*
       * Anyone can see a user's avatar
       */
      return true;
    }
  });
}

if (Meteor.isClient) {

  Meteor.subscribe("users");
  Session.set("formData", undefined);

  Template.body.helpers({
    formTemplate: function () {
      return Session.get("formTemplate");
    },
    formData: function () {
      return Session.get("formData");
    }
  });

  Template.profileImg.helpers({
    imageUploadConfig: function() {
      return {
        imageCollection: UserImages,
        store: "userImages-thumbnail"
      };
    },
    coll: function() {
      return UserImages;
    },
    handle: function() {
      return Meteor.user().profile.name;
    }
  });

  Template.users.helpers({
    users: function() {
      return Meteor.users.find({});
    }
  });

  Template.user.helpers({
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
}

// Products = new Mongo.Collection('products');
//
// Products.allow({
//   update: ownsDocument,
//   remove: ownsDocument
// });
//
// Products.deny({
//   update: function(userId, product, fieldNames){
//     //may only edit the following three fields
//     return (_.without(fieldNames, 'name', 'price', 'description', 'type', 'size', 'color', 'category').length > 0);
//   }
// });

Meteor.methods({
  product: function(productAttributes){
    var user = Meteor.user(),
      productWithSameName= userProducts.findOne({name: productAttributes.name});

      // ensure the user is logged in
      if(!user)
        throw new Meteor.Error(401, "You need to login to post products");

      // ensure the product has a name
      if(!productAttributes.name)
        throw new Meteor.Error(422, 'Please fill in a name');

      //check that there are no previous posts with the same name
      if(productAttributes.name && productWithSameName){
        throw new Meteor.Error(302,
          'This product has already been posted',
          productWithSameName._id);
      }

      //pick out the whitelisted keys
      var product = _.extend(_.pick(productAttributes, 'name', 'price', 'description', 'type', 'size', 'color', 'category','image'), {
        userId: Meteor.userId(),
        author: user.profile.name,
        submitted: new Date().getTime(),
        commentsCount: 0
      });

      var productId = userProducts.insert(product);

      return productId;
  }
});




// ProductsIndex = new EasySearch.Index({
//   collection: Products,
//   fields: ['name','price'],
//   engine: new EasySearch.Minimongo()
// });
// PRODUCT IMAGES
ProductImages = ImageUpload.createCollection("productImages", userProducts, {
  defaultPermissions: true,
  publicRead: true,
  sizes: {
    normal: [800,800],
    thumbnail: [200, 200],
    avatar: [50, 50]
  }
});

if (Meteor.isServer) {
  ProductImages.allow({
    insert: function(userId, doc) {
      return !!userId;
    },
    update: function(userId, doc) {
      /*
       * User can update their own image only
       */
      return doc && doc.addedBy === userId;
    },
    remove: function(userId, doc) {
      /*
       * User can remove their own image only
       */
      return doc && doc.addedBy === userId;
    },
    download: function(userId, fsFile) {
      /*
       * Anyone can see a user's avatar
       */
      return true;
    }
  });
}




if (Meteor.isClient) {

  Meteor.subscribe("users");

  Template.profile.helpers({
    formTemplate: function () {
      return Session.get("formTemplate");
    },
    formData: function () {
      return Session.get("formData");
    }
  });

  Template.profile.helpers({
    imageUploadConfig: function() {
      return {
        imageCollection: UserImages,
        store: "productImages-thumbnail"
      };
    },
    coll: function() {
      return Product;
    },
    handle: function() {
      return Product.findOne().name;
    }
  });


  Template.profile.helpers({
    id: function() {
      return this.product.name;
    },
    avatar: function() {
      return ProductImages.findOne({associatedObjectId: this.product._id});
    },
    imageUrl: function() {
      return UserImages.findOne({associatedObjectId: this._id}).url({store: "productImages-avatar"});
    }
  });
}
