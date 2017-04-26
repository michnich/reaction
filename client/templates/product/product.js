Template.shop.rendered = function() {
	if (!Meteor.user()) {
	    var showSignUp = window.setTimeout(function() {
			swal({
				  title: 'Join the Hunt',
				  text: "It's free!",
				  imageUrl: 'resources/popup.png',
				  imageHeight: 200,
				  imageWidth: 200,
				  showCancelButton: true,
				  confirmButtonColor: '#3085d6',
				  cancelButtonColor: '#d33',
				  confirmButtonText: 'Sign Me Up',
				  cancelButtonText: 'Not Today',
				  confirmButtonClass: 'btn btn-danger',
				  cancelButtonClass: 'btn btn-default',
				  buttonsStyling: false
				}).then(function () {
					Router.go('/signUp');
				}, function (dismiss) {
				  // dismiss can be 'cancel', 'overlay',
				  // 'close', and 'timer'
				  if (dismiss === 'cancel') {
				  }
				});
		}, 20000);
	}
};