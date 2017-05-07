Template.cartCompleted.onCreated(function() {
  console.log('cartCompleted created');
  console.log(Router.current().params._id);
  console.log(Meteor.userId());

  Meteor.subscribe("completedOrder", Meteor.userId(), Router.current().params._id, function(result, error) {
    console.log('callback');
    console.log(ReactionCore.Collections.Orders.findOne({}));
    console.log(Orders.findOne({}));
  });

});
/*ReactionCore.MethodHooks.before('cart/submitPayment', function(options){
  console.log('called cart submit before');
  console.log(options);
  
});

ReactionCore.MethodHooks.after('cart/submitPayment', function(result, error){
  console.log('called cart submit');
  console.log(Router.current().params._id);
  console.log(result);
  Meteor.subscribe("completedOrder", Meteor.userId(), Router.current().params._id, function(result, error) {
    console.log('callback');
  });
});*/

/*ReactionCore.MethodHooks.after('orders/sendNotification', function(result, error){
  console.log('called after orders');
  console.log(result);
  console.log(error);
  console.log(Router.current.params._id);
  Meteor.subscribe("completedOrder", Meteor.userId(), Router.current.params._id, function(result, error) {
    console.log('callback');
  });
});*/

Template.checkoutPayment.events({
  'submit form': function(e) {
      e.preventDefault();
      console.log('submitted');
      // // send email
      var userEmail = Meteor.user().emails[0].address;

      // // Send email to huntrs
      Meteor.call('sendEmail', {
        //to: 'ikeewell@gmail.com',
        to: 'michnich07@gmail.com',
        from: 'no-reply@huntrs.com',
        subject: userEmail + ' has bought a product',
        text: 'Mailgun is totally awesome for sending emails!',
        html: userEmail + ' has bought a new product, please review in ORDERS and make sure stripe payment was accepted'
      });
    }
});
