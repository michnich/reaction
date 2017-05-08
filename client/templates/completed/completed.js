Template.cartCompleted.onCreated(function() {
  Meteor.subscribe("completedOrder", Meteor.userId(), Router.current().params._id, function(result, error) {
    var order = ReactionCore.Collections.Orders.findOne({});
    var numItems = order.items.length;
    var itemString = "<h2>Items Ordered</h2>\n";
    var x = 0;
    for (x = 0; x < numItems; x++) {
      var temp = "<h3>Title: " + order.items[x].variants.title + "</h3>\n" + "<h4>Product Id: " + order.items[x].productId + "</h4>\n"
      + "<h4>Product Price: " + order.items[x].variants.price + "</h4>";
      itemString = itemString.concat(temp); 
    }
    var userInfoString = "<h2>User Details: </h2>\n" + "<h3>Name: " 
    + order.shipping[0].address.fullName + "</h3>\n" + "<h3>Address: " 
    + order.shipping[0].address.address1 + "," + order.shipping[0].address.city + " " 
    + order.shipping[0].address.region + " " + order.shipping[0].address.postal + "</h3>\n";
    var header = "<h1>" + order.email + " has placed an order!</h1>\n";

    Meteor.call('sendEmail', {
        //to: 'ikeewell@gmail.com',
        to: 'michnich07@gmail.com',
        from: 'no-reply@huntrs.com',
        subject: order.email + ' has bought a product',
        text: 'Mailgun is totally awesome for sending emails!',
        html: header + userInfoString + itemString
    });
    //order.userId -> user who ordered
    //order.itemCount -> maybe the number of items
    //order._id
    //order.createdAt -> time and date of order
    //order.items -> array of items bought
    //order.items[].productId
    //order.items[].title?
    //order.items[].variants.title
  });
});

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
