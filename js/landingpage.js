var textArray = [
    'Seems like youtube would be a fun choice.',
    'Maybe look at some memes?',
    'How about some satisfying desktops',
    'Those support tickets really need answering!',
    'You should probably be choosing blue right now',
    'Have you checked the forums yet?',
    'How about getting some work done?',
    'Maybe look at some useful desktops',
    'Why not look at some dank memes',
    'How about browsing some reddit',
    'Maybe look at some memes',
    'Shouldn\'t you be outside right now?'
];

var randomNumber = Math.floor(Math.random()*textArray.length);

i = 1;
$('a[name="type"]').each(function(index, element) {
  i++;
  element.typeText = element.innerHTML;
  setTimeout(function() {
    typeEffect(element, element.typeText, 0, 25);
  }, i*50);
  element.innerHTML = "";

});


setTimeout(function() {
  pandemic( function(data) {
    document.getElementById("pandemic-tracker").innerHTML = data;
  });
  localpandemic( function(data) {
    document.getElementById("local-pandemic-tracker").innerHTML = data;
  });
  statepandemic( function(data) {
    document.getElementById("state-pandemic-tracker").innerHTML = data;
  });
  typeEffect(document.getElementById("hello"), textArray[randomNumber], 0, 25);
  document.getElementById("time-tracker").innerHTML = timenow();
}, 50);

document.onkeydown = function(e) {
  if (e.which == 13) {
    window.location.href = "https://google.com/search?q=" + document.getElementById("search-input").value;
    console.log("submit")
  }
}    

function timenow(){
  var now= new Date(), 
  ampm= ' in the morning', 
  h= now.getHours(), 
  m= now.getMinutes(), 
  s= now.getSeconds();

  if(h> 12){
      if(h>12) h -= 12;
      ampm= ' in the afternoon';
      console.log(h);
      if((h - 1)>= 6){
          ampm= ' at night';
      }
  }
  console.log(h);

  if(m<10) m= '0'+m;
  if(s<10) s= '0'+s;
  return h + ':' + m + ampm;
}

function pandemic(callback) {
  $.get("https://api.covid19api.com/summary", function(data) {
    console.log(data);
    callback(
      "Cases: " + abbrNum(data.Global.TotalConfirmed, 1) + " (+" + abbrNum(data.Global.NewConfirmed,1)
    +") Deaths: " + abbrNum(data.Global.TotalDeaths, 1) + " (+" + abbrNum(data.Global.NewDeaths, 1)
    + ") Recovered: " + abbrNum(data.Global.TotalRecovered, 1) + " (+" + abbrNum(data.Global.NewRecovered, 1) + ")");
  })
}

function statepandemic(callback) {
  $.get("https://api.covid19api.com/live/country/united-states", function(data) {
    data = data.filter(function(data) {
      return data.Province == "California";
    });
    console.log(data[data.length-1]);
    console.log(data[data.length-2]);
    callback(
      "Cases: " + abbrNum(data[data.length-1].Confirmed, 1) + " (+" + abbrNum(data[data.length-1].Confirmed - data[data.length-2].Confirmed, 1) 
    + ") Deaths: " + abbrNum(data[data.length-1].Deaths, 1) + " (+" + abbrNum(data[data.length-1].Deaths - data[data.length-2].Deaths, 1) 
    + ") Recovered: " + abbrNum(data[data.length-1].Recovered, 1) + " (+" + abbrNum(data[data.length-1].Recovered - data[data.length-2].Recovered, 1) + ")");
  })
}

function localpandemic(callback) {
  $.get("https://api.covid19api.com/total/country/united-states", function(data) {
    console.log(data[data.length-1]);
    console.log(data[data.length-2]);
    callback(
      "Cases: " + abbrNum(data[data.length-1].Confirmed, 1) + " (+" + abbrNum(data[data.length-1].Confirmed - data[data.length-2].Confirmed, 1) 
    + ") Deaths: " + abbrNum(data[data.length-1].Deaths, 1) + " (+" + abbrNum(data[data.length-1].Deaths - data[data.length-2].Deaths, 1) 
    + ") Recovered: " + abbrNum(data[data.length-1].Recovered, 1) + " (+" + abbrNum(data[data.length-1].Recovered - data[data.length-2].Recovered, 1) + ")");
  })
}

// Thanks https://stackoverflow.com/questions/2685911/is-there-a-way-to-round-numbers-into-a-reader-friendly-format-e-g-1-1k
function abbrNum(number, decPlaces) {
  // 2 decimal places => 100, 3 => 1000, etc
  decPlaces = Math.pow(10,decPlaces);

  // Enumerate number abbreviations
  var abbrev = [ "k", "m", "b", "t" ];

  // Go through the array backwards, so we do the largest first
  for (var i=abbrev.length-1; i>=0; i--) {

      // Convert array index to "1000", "1000000", etc
      var size = Math.pow(10,(i+1)*3);

      // If the number is bigger or equal do the abbreviation
      if(size <= number) {
           // Here, we multiply by decPlaces, round, and then divide by decPlaces.
           // This gives us nice rounding to a particular decimal place.
           number = Math.round(number*decPlaces/size)/decPlaces;

           // Handle special case where we round up to the next abbreviation
           if((number == 1000) && (i < abbrev.length - 1)) {
               number = 1;
               i++;
           }

           // Add the letter for the abbreviation
           number += abbrev[i];

           // We are done... stop
           break;
      }
  }

  return number;
}

function typeEffect(element, text, i, speed) {
  if (i == 0) {
    element.innerHTML = "";
  }
  if (i < text.length) {
    element.innerHTML += text.charAt(i);
    i++;
    setTimeout(function() { typeEffect(element, text, i, speed) } , speed);
  }
}