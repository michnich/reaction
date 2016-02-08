Template.profile.rendered = function(){
  if (Meteor.user().profile.first_name == undefined){
    Modal.show('editProfile');
  } else {
    // Modal.hide('editProfile');
  }
}

Template.profile.helpers({
  isUser: function(){
    return Meteor.user().profile.name === Router.current().params.username
  },
  isOwner: function(){
    return Roles.userIsInRole(Meteor.userId(),['dashboard','owner','admin']);
  },
  username: function(){
    return Router.current().params.username
  },
  //super important function that allows us to index the current user that is showed in closet
  firstName: function(){
    var email = Router.current().params.username;
    return Meteor.users.findOne({"emails.address": email}).profile.first_name;
  },
  aboutYou: function(){
    var email = Router.current().params.username;
    return Meteor.users.findOne({"emails.address": email}).profile.about;
  },
  products: function(){
    return userProducts.find({author: Router.current().params.username}).fetch()
  },
  isVerified: function(){
    var email = Router.current().params.username;
    return Meteor.users.findOne({"emails.address": email}).emails[0].verified;
  },
  isListed: function(){
    return userProducts.findOne({_id:this._id}).link_id;
  }
});


// verify product has been listed by adding link_id
Template.profile.events({
  "click .updateIdTrigger": function(event){
    Modal.show('#updateModal');
  },
  "submit .idUpdate": function (event){
    event.preventDefault();
    var oldId = this._id;
    var newId = event.target.text.value;
    alert(oldId);
    alert(newId);
    userProducts.update(oldId, {
      $set: {link_id: newId}
    });

    //send email to user saying that the product has been listed
    var userEmail = Router.current().params.username;
    Meteor.call('sendEmail', {
      to: userEmail,
      from: 'no-reply@huntrs.com',
      subject: 'Your product has been listed!',
      text: 'Mailgun is totally awesome for sending emails!',
      html: '<h1>Congratulations</h1> <br> <h2> Your Product has been listed on the shop! You are well on your way to cashing in!</h2>'
    });
  }
  // 'submit form': function(e, t){
  //      // Prevent default actions
  //      e.preventDefault();
  //  var files = [];
  //  var file = $('#userimage')[0].files[0];
  //  console.log(file);
  //  files.push(file);
  //  Cloudinary._upload_file(files[0], {}, function(err, res) {
  //        console.log("Upload Error: " + err);
  //        console.log("Upload Result: " + res);
  //      });
  //  }
});



Template.editProfile.events({

  "submit .closetinfo": function (event) {
    // Prevent default browser form submit
    event.preventDefault();
    // Get value for first name
    var first_name = $('#firstName').val();
    // var first_name = event.target.first_name.value;

    // Get value from last name
    var last_name = $('#lastName').val();

    // Get value from about info
    var about = $('#aboutYou').val();

    // // Insert a task into the collection
    Meteor.users.update(Meteor.userId(),
    {$set: {
      'profile.first_name': first_name,
      'profile.last_name': last_name,
      'profile.about': about
      }
    }
    );


    // hide modal
    Modal.hide('editProfile');

  }




});
