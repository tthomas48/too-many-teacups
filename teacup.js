function updateFound() {
  if((7 - found.length) == 0) {
    $('#found').html('none! You win!');
  }
  $('#found').html(7 - found.length);
}
function clickLocation(id) {
  window.console.log(locations);
  window.console.log(found);

  $('#teacup').hide();
  var foundTeacup = false;
  for(i = 0; i < locations.length; i++) {
    if(locations[i] == id) {
      foundTeacup = true;
      if($.inArray(id, found) == -1) {
        found[found.length] = id;
        updateFound();
      }
    }
  }
  var coordString = $('area[href="#/location-' + id + '"]').attr('coords');
  var coords = coordString.split(',');
  for(i = 0; i < found.length; i++) {
    if(found[i] == id) {
      var roomPosition = $('#room').position();
      $('#teacup').html('<img src="img/teacup' + (i + 1) + '.png" />');
      var cTop = Number((coords[3] - coords[1]) / 2) + Number(coords[1]);
      var cLeft = Number((coords[2] - coords[0]) / 2) + Number(coords[0]);

      $('#teacup').attr('style', 'display: block; position: absolute; top: ' + Math.ceil(roomPosition.top + cTop)  + 'px;left: ' + Math.ceil(roomPosition.left + cLeft) + 'px;');
    }
  }
}
function loadRoom(id) {
  $('#teacup').hide();
  $.get("img/" + id + ".png.map", function(response) {
    $('#main').html('<img id="room" src="img/' + id + '.png" usemap="#map"/>' + response);
  });
  
}
var routes = {
        '/location-:id': clickLocation,
        '/kitchen': function() { loadRoom('kitchen') },
        '/living-room': function() { loadRoom('living-room') },
        '/dining-room': function() { loadRoom('dining-room') },
        '/guest-bedroom': function() { loadRoom('guest-bedroom') },
        '/master-bedroom': function() { loadRoom('master-bedroom') },
        '/kids-room': function() { loadRoom('kids-room') },
        '/bathroom': function() { loadRoom('bathroom') } 

};

var found = [];
var locations = [];
function initTeacups() {
  for(i = 0; i < 7; i++) {
    var done = false;
    while(!done) {
      var foundItem = false;
      var random = Math.floor(Math.random() * 29) + 1;
      for(j = 0; j < locations.length; j++) {
        if(locations[j] == random) {
          foundItem = true;
        }
      }
      if(!foundItem) {
        locations[i] = random;
        done = true;
      }
    }
  }
}
initTeacups();

var router = Router(routes);
router.init('living-room');
