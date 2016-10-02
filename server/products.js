Meteor.startup( () => {
  BrowserPolicy.content.allowImageOrigin( "https://res.cloudinary.com" );
})

if (Meteor.isServer){
  process.env.MAIL_URL = 'smtp://postmaster%40sandbox760999b1f5094de9890542012a73d75c.mailgun.org:d8645e3d700146694c415efc7d03027c@smtp.mailgun.org:587';

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
//change

}
