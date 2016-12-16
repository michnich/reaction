ReactionCore.MethodHooks.after('orders/orderCompleted', function(options){
	var order = options.arguments[0];
	var userEmail = Meteor.findOne({'_id': order.userId}).emails[0].address;
	var product = Meteor.findOne({'_id': order.transactions.itemId}).title;
	var emails = ["ikeewell@gmail.com", "sam@onehunted.com"];
	Meteor.call('sendEmail', {
        to: emails,
        from: 'no-reply@huntrs.com',
        subject: userEmail + ' has bought a product',
        text: 'Mailgun is totally awesome for sending emails!',
        html: userEmail + ' has bought ' + product + '. Please review in ORDERS and make sure the stripe payment was accepted'
      });
}