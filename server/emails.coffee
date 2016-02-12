if Meteor.isServer
        PrettyEmail.options =
          from: 'huntrs@huntrs.co'
          # logoUrl: "http://localhost:3000/resources/huntrs-h.png",
          logoUrl: "http://huntrsapp-s.herokuapp.com/resources/huntrs-h.png"
          companyName: 'myCompany'
          companyUrl: 'http://mycompany.com'
          companyAddress: '123 Street, ZipCode, City, Country'
          companyTelephone: '+1234567890'
          companyEmail: 'support@mycompany.com'
          siteName: 'mycompany'

        PrettyEmail.defaults.verifyEmail =
          heading: 'Activate your account to start hunting',
          buttonText: 'Activate',
