ReactionCore.MethodHooks.after('orders/sendNotification', function(order, action){
  var userEmail = order.arguments[0].email;
  var userId = order.arguments[0].userId;
  var shippingMethod = order.arguments[0].shipping[0].shipmentMethod.name;
  Meteor.call('sendEmail', {
    to: 'ikeewell@gmail.com',
    from: 'no-reply@huntrs.co',
    subject: userEmail + 'has placed a ' + shippingMethod + ' order',
    text: '',
    html: userEmail + ' (User Id: ' + userId + ') has placed an order with ' + shippingMethod + ' shipping, please review in ORDERS and capture the payment.'
  });
});
