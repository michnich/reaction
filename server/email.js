Accounts.emailTemplates.from='no-reply@huntrs.com';
Accounts.emailTemplates.sitename='HUNTRS';
Accounts.emailTemplates.verifyEmail = {
  subject() {
    return "Verify Your Email Address";
  },
  text( user, url ) {
    let emailAddress   = user.emails[0].address,
        urlWithoutHash = url.replace( '#/', '' ),
        emailBody      = `To verify your email address (${emailAddress}) visit the following link:\n\n${urlWithoutHash}\n\n If you did not request this verification, please ignore this email.`;

    return emailBody;
  }
};

Meteor.methods({
  sendVerificationLink() {
    let userId = Meteor.userId();
    if ( userId ) {
      return Accounts.sendVerificationEmail( userId );
    }
  }
});