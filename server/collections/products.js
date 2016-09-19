// userProducts = new Mongo.Collection('userProducts');
Meteor.publish('userProducts', function(){
  return userProducts.find();
});

//pass the function the user id
//returns all published products posted by that user
Meteor.publish('productsByUser', function(userId) {
	return ReactionCore.Collections.Products.find({vendor: userId});
});
