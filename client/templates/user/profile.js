Template.profile.onCreated(function() {
  this.subscribe('userProductsByUser', Router.current().params.userId);
});

Template.profile.rendered = function(){
  if (Meteor.user().profile.first_name == undefined){
    Modal.show('editProfile');
  } else {
    // Modal.hide('editProfile');
  }
  $('[data-toggle="tooltip"]').tooltip();
  $('#setUpLater').on('click',function(){
    Router.go('/');
    Modal.hide('editProfile');
  });

  $('.edit-profile').on('click',function(){
    Modal.show('editExistingProfile');
  });
}

/*
  can change this helpers once the user directory subscription issue is fixed
  right now subscribes to all users so need to limit search
  after should only be subscribed to the seller and can be returned from router
*/
Template.profile.helpers({
  isUser: function(){
    return Meteor.user()._id === Router.current().params.userId;
  },
  isOwner: function(){
    return Roles.userIsInRole(Meteor.userId(),['dashboard','owner','admin']);
  },
  username: function(){
    return Meteor.users.findOne({"_id": Router.current().params.userId}).profile.username;
  },
  userEmail: function(){
    var user = Router.current().params.userId;
    return Meteor.users.findOne({"_id":user}).emails[0].address;
  },
  userId: function() {
    return Router.current().params.userId;;
  },
  //super important function that allows us to index the current user that is showed in closet
  firstName: function(){
    var user = Router.current().params.userId;
    return Meteor.users.findOne({"_id":user}).profile.first_name;
  },
  aboutYou: function(){
    var user = Router.current().params.userId;
    return Meteor.users.findOne({"_id":user}).profile.about;
  },
  products: function(){
    var user = Router.current().params.userId;
    var email = Meteor.users.findOne({"_id":user}).emails[0].address;
    return userProducts.find({author: email}).fetch()
  },
  isVerified: function(){
    var user = Router.current().params.userId;
    return Meteor.users.findOne({"_id":user}).emails[0].verified;
  },
  isListed: function(){
    return userProducts.findOne({_id:this._id}).link_id;
  },
  profileUrl: function(){
    var imageSource = $('.uploaded-image').attr('src');
    return imageSource;
  },
  profilePic: function () {
    var user = Router.current().params.userId;
    return Meteor.users.findOne({"_id":user}).profile.profile_pic;
  },
  productLink: function() {
    var link = userProducts.findOne({_id:this._id}).link_id;
    if (link) {
      return "/product/" + link;
    }
    else {
      return "#";
    }
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
    var user = Router.current().params.username;
    var userEmail = Meteor.users.findOne({"_id":user}).emails[0].address;
    Meteor.call('sendEmail', {
      to: userEmail,
      from: 'no-reply@huntrs.com',
      subject: 'Your product has been listed!',
      text: 'Mailgun is totally awesome for sending emails!',
      html: '<h1>Congratulations</h1> <br> <h2>Your Product has been listed on the shop! You are well on your way to cashing in!</h2>'
    });
  },
  "click .add-profile-image":function(event){
    alert('image added');
    var profileImage = $('.afCloudinary-thumbnail a').attr('href');
    console.log(profileImage);
    Meteor.users.update(Meteor.userId(),
    {$set: {
      'profile.profile_pic': profileImage
      }
    }
    );
  }
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
Template.editExistingProfile.events({

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
    Modal.hide('editExistingProfile');

  }


});
