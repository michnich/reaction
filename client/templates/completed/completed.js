Template.checkoutPayment.events({
  'submit form': function(e) {
      e.preventDefault();
      // // send email
      var userEmail = Meteor.user().emails[0].address;

      // // Send email to huntrs
      Meteor.call('sendEmail', {
        to: 'ehughespt@gmail.com',
        from: 'no-reply@huntrs.com',
        subject: userEmail + ' has bought a product',
        text: 'Mailgun is totally awesome for sending emails!',
        html: userEmail + ' has bought a new product, please review in ORDERS and make sure stripe payment was accepted'
      });
    }
});
