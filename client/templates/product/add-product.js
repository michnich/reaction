// Template.addProduct.helpers({
//   username: function(){
//     return Meteor.user().profile.name;
//   }
// });

Template.addProduct.events({
  'submit form': function(e) {
      e.preventDefault();

      // send email
      var userEmail = Meteor.user().emails[0].address;
      var productName = $('#productName').val();
      var productPrice = $('#productPrice').val();

      // Send email to huntrs
      Meteor.call('sendEmail', {
        to: 'ehughestaylor@codedbykids.com',
        from: 'no-reply@huntrs.com',
        subject: userEmail + ' just added a product to his closet, please review and respond to this user within 3-5 days',
        text: 'Mailgun is totally awesome for sending emails!',
        html: '<h1>Product Details </h1> <br> ' + productName + '<br>' + productPrice
      });

      // Send email to user
      Meteor.call('sendEmail', {
        to: Meteor.user().emails[0].address,
        from: 'no-reply@huntrs.com',
        subject: 'Thank you for adding a product please allow 3-5 days for us here at huntrs to review your submission!',
        text: 'Mailgun is totally awesome for sending emails!',
        html: 'Thank you for adding the following product, please allow 3-5 days for us to review your submission <br> ' + productName + '<br>' + productPrice
      });
    }

});
