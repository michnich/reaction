// userProducts = new Mongo.Collection('userProducts');
Meteor.publish('userProducts', function(){
  return userProducts.find();
});

//pass the function the user id
//returns all published products posted by that user
Meteor.publish('productsByUser', function(userId) {
	check(userId, String);
	return ReactionCore.Collections.Products.find({"vendor": userId});
});

Meteor.publish('userProductsByUser', function(userId) {
	check(userId, String);
	return userProducts.find({"userId": userId});
});

Meteor.publish('userProductsByEmail', function(email) {
	check(email, String);
	return userProducts.find({"author": email});
});


