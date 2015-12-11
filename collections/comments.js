ownsDocument = function(userId, doc) {
  return doc && doc.userId === userId;
}

Comments = new Meteor.Collection('comments');

Comments.allow({
  update: ownsDocument,
  remove: ownsDocument
});
Meteor.methods({
  comment: function(commentAttributes){
    var user = Meteor.user();
    var product = Products.findOne(commentAttributes.productId);
    //ensure user is logged in
    if (!user)
        throw new Meteor.Error(401, "You need to login to make comments");

    if (!commentAttributes.body)
        throw new Meteor.Error(422, 'Please write some content');

    if (!product)
        throw new Meteor.Error(422, 'You must comment on a post');

    comment = _.extend(_.pick(commentAttributes, 'productId', 'body'), {
      userId: user._id,
      author: user.username,
      submitted: new Date().getTime()
    });

    return Comments.insert(comment);

  }
});
