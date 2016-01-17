// Template.addProduct.helpers({
//   username: function(){
//     return Meteor.user().profile.name;
//   }
// });

Template.addProduct.events({
  'submit form': function(e) {
      e.preventDefault();

      // send email
      // var userEmail = return Meteor.user().emails[0].address;
      var productName = $('#productName').val();
      var productPrice = $('#productPrice').val();

      Meteor.call('sendEmail', {
        to: Meteor.user().emails[0].address,
        from: 'no-reply@huntrs.com',
        subject: 'Thank you for adding a product please allow 3-5 days for us here at huntrs to review your submission!',
        text: 'Mailgun is totally awesome for sending emails!',
        html: 'Thank you for adding the following product, please allow 3-5 days for us to review your submission <br> ' + productName + '<br>' + productPrice
      });


      // var product = {
      //
      //   type: $(e.target).find('[name=type]').val(),
      //   category: $(e.target).find('[name=category]').val(),
      //   size: $(e.target).find('[name=size]').val(),
      //   color: $(e.target).find('[name=color]').val(),
      //   condition: $(e.target).find('[name=condition]').val(),
      //   type: $(e.target).find('[name=type]').val(),
      //   size2: $(e.target).find('[name=size2]').val(),
      //   description: $(e.target).find('[name=description]').val(),
      //   name: $(e.target).find('[name=name]').val(),
      //   price: $(e.target).find('[name=price]').val(),
      //   // image: $('.uploaded-image').prop('src')
      //
      // }

      // Meteor.call('product', product, function(error, id){
      //   if (error){
      //     // return alert(error.reason);
      //   }
      //   Router.go('/products');
      //   Modal.show('thanksForAdding');
      // });
    }

});
// Template.newProductEmail.events({
//   'submit form': function(e,t) {
//
//       e.preventDefault();
//
//       var toAddress = 'huntrs@gmail.com'
//       var productName = $(e.target).find('[name=name]').val();
//       var productPrice = $(e.target).find('[name=price]').val();
//       var productDescription =  $(e.target).find('[name=description]').val();
//
//       Meteor.call('sendEmail', toAddress, productName, productPrice, productDescription);
//
//     }
//
// });
// if(Meteor.isClient){
//   Template.newProductEmail.events({
//     'click #product-button': function (e,t) {
//       e.preventDefault();
//
//             var toAddr = 'ehughespt@gmail.com';
//             var subj = $(e.target).find('[name=price]').val();
//             // var productPrice = $(e.target).find('[name=price]').val();
//             var body =  t.find('#productDescription').value;
//
//       // if someone click on the button ( tag), then we ask the server to execute the function sendEmail (RPC call)
//       Meteor.call('sendEmail', toAddr, subj, body)
//     }
//   });
// }
