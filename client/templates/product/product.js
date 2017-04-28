Template.shop.rendered = function() {
	if (Meteor.user().emails.length === 0) {
		window.setTimeout(function(){
	  		Modal.show('popup');
		}, 15000);
	}
};

Template.popup.events({
	'click #signUpPopup': function() {
		Router.go('sell');
		Modal.hide('popup');
	}
});
