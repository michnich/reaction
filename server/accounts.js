if(Meteor.isServer) {

  Meteor.startup(function () {

   process.env.MAIL_URL = Meteor.settings.MAIL_URL;

   Accounts.emailTemplates.from='no-reply@huntrs.com';
   Accounts.emailTemplates.sitename='HUNTRS';

   Accounts.emailTemplates.verifyEmail.subject = function(user) {
     return 'Confirm Your Email Address';
   };
   Accounts.emailTemplates.verifyEmail.text = function(user, url) {
     return 'Click on the following link to verify your email address: ' + url;
   };

   Accounts.config({
     sendVerificationEmail:true
   });

   //Accounts.sendVerificationEmail(this.userId);
  });
 }
