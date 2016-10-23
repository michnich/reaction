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

Meteor.publish('sellerSectionProducts', function(userId) {
	check(userId, String);
	return userProducts.find({"userId": userId}, {fields: 
		{"image": 1, 
		"link_id": 1,
		"userId" : 1
	}});
});

Meteor.publish('profileProducts', function(userId) {
	check(userId, String);
	return userProducts.find({"userId": userId}, {fields: {   
		"image": 1, 
		"link_id": 1, 
		"name": 1, 
		"price": 1,
		"type": 1,
		"userId": 1,
		"author": 1
	}});
});


