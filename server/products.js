Meteor.startup( () => {
  BrowserPolicy.content.allowImageOrigin( "https://res.cloudinary.com" );
})

if (Meteor.isServer){
  //process.env.MAIL_URL = 'smtp://postmaster%40huntrs.co.mailgun.org:101fe879dbbb5c4090c6dd0fac4922e7@smtp.mailgun.org:587';
  Meteor.methods({
    sendEmail: function(mailFields) {
      console.log('About to send email....');
      check([mailFields.to, mailFields.from, mailFields.subject, mailFields.text, mailFields.html], [String]);


      // Let other method calls from the same client start running,
      // without waiting for the email sending to complete.
      this.unblock();


      // send the email!
      Email.send({
        to: mailFields.to,
        from: mailFields.from,
        subject: mailFields.subject,
        text: mailFields.text,
        html: mailFields.html
      });

      console.log("email sent!");
    }
  });


}
