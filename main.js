

if (Meteor.isClient) {
  
  Meteor.startup(function() {
  
  
		var stages = $('#stages').find('.stage');
		var n = 1;
		
		var windowHeightTop = ($(window).height() -44);
		
		var sixth = (windowHeightTop / 6) + 'px';
		stages.css({'height':sixth,'line-height':sixth});
		
		$(document).bind('openingEffect', addEffectStepping);
	
		setTimeout(function() {
			$('body').addClass('loaded');
			$(document).trigger('openingEffect');
			
	    }, 600);
	    
	    function addEffectStepping(){
	        setTimeout(function() {
	           $('#stages').find('.stage:nth-child(' + n +')').addClass('show');
	            n++;
	
	            if (n == length){
	                n = 0;
	            };
	            
	            addEffectStepping();
	
	        }, 200);
	    }

  
  
  
  
  
  
    // client: subscribe to the count for the current room
      //Meteor.subscribe("number-of-stages");
      OutsideLive.createStages();

      Meteor.setInterval(function() {
        //update the attributes for the stages every 30 seconds
        Template.stages.stages();
      }, 30000);

      //demo click has three songs, others have one current one
      //make time of shit between 12pm and 5pm
      //manual setting of performances
      //performances have songs
    //   setTimeout(function() {
    //   var counts = Performances.find({}).count();
    //   console.log("number of performances: ", counts);
    //     if (counts === 0) {
    //       Performances.insert({
    //         day: 1,
    //         artist: "Daft-Punk",
    //         stage: Stages.findOne({name: "Lands End"}),
    //         startTime: 1200,
    //         endTime: 1700
    //       });
    //       Performances.insert({
    //         day: 1,
    //         artist: "Vampire Weekend",
    //         stage: Stages.findOne({name: "Sutro"}),
    //         startTime: 1200,
    //         endTime: 1900
    //       });
    //       Performances.insert({
    //         day: 1,
    //         artist: "Tokyo Police Crew",
    //         stage: Stages.findOne({name: "Twin Peaks"}),
    //         startTime: 1100,
    //         endTime: 1800
    //       });
    //       Performances.insert({
    //         day: 1,
    //         artist: "Zedd",
    //         stage: Stages.findOne({name: "Panhandle"}),
    //         startTime: 1210,
    //         endTime: 1600
    //       });
    //       Performances.insert({
    //         day: 1,
    //         artist: "Pheonix",
    //         stage: Stages.findOne({name: "The Dome"}),
    //         startTime: 1000,
    //         endTime: 1600
    //       });
    //       Performances.insert({
    //         day: 1,
    //         artist: "Paul MccArtney",
    //         stage: Stages.findOne({name: "The Barbary"}),
    //         startTime: 1200,
    //         endTime: 1730
    //       });
    //   }
    // }, 10000);
      
    
    //Data subscription complete. All data is downloaded
    
  });

  Template.adminPanelLink.events({
    'click a.admin-panel' : function () {
      Session.set("adminPanel", true);
    }
  });

  Handlebars.registerHelper("currentStage", function() {
    return Session.get("currentStage");
  });

  Handlebars.registerHelper("isCurrentUser", function() {
    return Meteor.user();
  });

  Handlebars.registerHelper("adminPanel", function() {
    return Session.get("adminPanel");
  });

};

if (Meteor.isServer) {
  
  Meteor.startup(function() {
    
    // server: publish the current size of a collection
    
  });

  // Meteor.publish("number-of-stages", function () {
  //     var self = this;
  //     var count = 0;
  //     var initializing = true;

  //     var handle = Stages.find({}).observeChanges({
  //       added: function (id) {
  //         count++;
  //         if (!initializing)
  //           self.changed("counts", {count: count});
  //       },
  //       removed: function (id) {
  //         count--;
  //         self.changed("counts", {count: count});
  //       }
  //       // don't care about moved or changed
  //     });

  //     // Observe only returns after the initial added callbacks have
  //     // run.  Now return an initial value and mark the subscription
  //     // as ready.
  //     initializing = false;
  //     self.added("counts", {count: count});
  //     console.log('sub ready');
  //     self.ready();

  //     // Stop observing the cursor when client unsubs.
  //     // Stopping a subscription automatically takes
  //     // care of sending the client any removed messages.
  //     self.onStop(function () {
  //       handle.stop();
  //     });
  //   });
  
  Meteor.methods({
    getArtistImage: function(performance) {
    url = "http://developer.echonest.com/api/v4/artist/images"

    Meteor.http.call("GET", url, 
      {params: {
        api_key: "FJIRSCGH8XZMYGTBT",
        name: performance.artist,
      }},
      function(error, result) {
        var imageURL = result.data.response.images[0].url;
        performance.imageURL = imageURL;
        return imageURL;
      })
  },

  getArtistBio: function(performance) {
    url = "http://developer.echonest.com/api/v4/artist/biographies"

    Meteor.http.call("GET", url,
      {params: {
        api_key: "FJIRSCGH8XZMYGTBT",
        name: performance.artist,
      }},
      function(error, result) {
        var bio = result.data.response.biographies[0].text;
        performance.bio = bio;
        return bio;
      })
  },
  });

};