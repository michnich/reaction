// Template.addProduct.helpers({
//   username: function(){
//     return Meteor.user().profile.name;
//   }
// });

Template.addProduct.events({
  'submit form': function(e) {
      e.preventDefault();

      // add product to product collection and to user closet

      var product = {

        type: $(e.target).find('[name=type]').val(),
        category: $(e.target).find('[name=category]').val(),
        size: $(e.target).find('[name=size]').val(),
        color: $(e.target).find('[name=color]').val(),
        condition: $(e.target).find('[name=condition]').val(),
        type: $(e.target).find('[name=condition]').val(),
        size2: $(e.target).find('[name=size2]').val(),
        description: $(e.target).find('[name=description]').val(),
        name: $(e.target).find('[name=name]').val(),
        price: $(e.target).find('[name=price]').val(),
        image: $('.uploaded-image').prop('src')

      }

    Meteor.call('product', product, function(error, id){
        if (error){
          // return alert(error.reason);
        }
        Router.go('/products');
        Modal.show('thanksForAdding');
        var productId = userProducts.insert(product);
        console.log(productId);
      });


      // // send email
      var userEmail = Meteor.user().emails[0].address;
      var productName = $('#productName').val();
      var productPrice = $('#productPrice').val();
      var productDesc = $('#product-desc').val();
      var productCondition = $('#productCondition').val();

      //
      // // Send email to huntrs
      Meteor.call('sendEmail', {
        to: 'ehughestaylor@codedbykids.com',
        from: 'no-reply@huntrs.com',
        subject: userEmail + 'has added a new product, please review',
        text: 'Mailgun is totally awesome for sending emails!',
        html: '<h1>Product Details </h1> <br> <h2> Product Title: </h2> <p>' + productName + '</p> <br> <h2>Product Price: </h2> <p>' + productPrice + '</p> <br> <h2> Product Description: </h2> <p>' + productDesc + ' </p> <br> <h2> Product Condition: </h2> <p>' + productCondition + '</p>'
      });

      // Send email to user
      Meteor.call('sendEmail', {
        to: Meteor.user().emails[0].address,
        from: 'no-reply@huntrs.com',
        subject: 'Thank you for adding a product please allow 3-5 days for us here at huntrs to review your submission!',
        text: 'Mailgun is totally awesome for sending emails!',
        html: 'Thank you for adding a new product, please allow 3-5 days for us to review your submission. <br> ' + productName + '<br>' + productPrice
      });
    }

});
