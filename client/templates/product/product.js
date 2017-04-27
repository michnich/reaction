Template.shop.rendered = function() {
	if (!Meteor.user()) {
	    var showSignUp = window.setTimeout(function() {
			swal({
				  title: '<span style="color: white">Join the Hunt</span>',
				  text: "It's free!",
				  background: url('resources/popup.png'),
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