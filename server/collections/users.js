Meteor.publish("userProfile",function(username){
    // simulate network latency by sleeping 2s
    // Meteor._sleepForMs(2000);
    // try to find the user by username
    check(username, String);
    var user = Meteor.users.findOne({"emails.address":username});
    // if we can't find it, mark the subscription as ready and quit
    if(!user){
        this.ready();
        return;
    }
    // if the user we want to display the profile is the currently logged in user...
    if(this.userId == user._id){
        // then we return the corresponding full document via a cursor
        return Meteor.users.find(this.userId);
    }
    // if(user.emails == undefined){
    //   Meteor.users.update(Meteor.userId(),
    //   {$set: {'profile.name': 'default'}}
    //   );
    // }
    else{
        // if we are viewing only the public part, strip the "profile"
        // property from the fetched document, you might want to
        // set only a nested property of the profile as private
        // instead of the whole property
        return Meteor.users.find(user._id,{
            fields:{
                "profile":1, //most of the data is stored in profile, why need it stripped?
                "emails": 1
            }
        });
    }
});

Meteor.publish("userProfileById",function(id){
    // simulate network latency by sleeping 2s
    // Meteor._sleepForMs(2000);
    // try to find the user by username
    check(id, String);
    var user = Meteor.users.findOne({"_id":id});
    // if we can't find it, mark the subscription as ready and quit
    if(!user){
        this.ready();
        return;
    }
    // if the user we want to display the profile is the currently logged in user...
    if(this.userId == user._id){
        // then we return the corresponding full document via a cursor
        return Meteor.users.find(this.userId);
    }
    // if(user.emails == undefined){
    //   Meteor.users.update(Meteor.userId(),
    //   {$set: {'profile.name': 'default'}}
    //   );
    // }
    else{
        // if we are viewing only the public part, strip the "profile"
        // property from the fetched document, you might want to
        // set only a nested property of the profile as private
        // instead of the whole property
        return Meteor.users.find(user._id,{
            fields:{
                "profile":1, //most of the data is stored in profile, why need it stripped?
                "emails": 1
            }
        });
    }
});


Meteor.publish('directory', function(){

  // var user= Meteor.users.findOne({} ,{fields: {_id: 1}}).fetch();
  // var employee_ids = Employees.find({}, {fields: {_id: 1}}).fetch();


  // if(user.emails == undefined){
  //   Meteor.users.update(Meteor.userId(),
  //   {$set: {'profile.name': 'default'}}
  //   );
  // }
  return Meteor.users.find({});
});

Meteor.publish('userProducts', function(){
  return userProducts;
});

//returns user based on the passed id (from meteor's account collection, not reaction's)
//switch to return only the neccessary fields
Meteor.publish('userById', function(userId) {
  check(userId, String);
  return Meteor.users.find({"_id": userId});
});
