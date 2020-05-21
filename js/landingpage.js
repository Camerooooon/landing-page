let searchEngine = 1; /* 0= google 1= duckduckgo 2= youtube */
$(document).ready(function () {
  $("#searchBox").focus(); /* Focuses the search bar on load so it can be typed into imediatly */
});

document.onkeydown = function(e) {

  if (e.which == 13) {

    if (searchEngine == 0) {
      window.location.href = "https://google.com/search?q=" + $("#searchBox").val();
    } else if (searchEngine == 1) {
      window.location.href = "https://duckduckgo.com/?q=" + $("#searchBox").val();
    } else if (searchEngine == 2) {
      window.location.href = "https://github.com/?q=" + $("#searchBox").val();
    } else {
      window.location.href = "https://youtube.com/search?q=" + $("#searchBox").val();
    }

  } else {

    if (e.which == 37) {
      if (searchEngine > 0) {
        searchEngine--;
      }
    } else if (e.which == 39) {
      if (searchEngine < 3) {
        searchEngine++;
      }
    }
    $("h2").removeClass("selected");
    if (searchEngine == 0) {
      $("#google-engine").addClass("selected");
    } else if (searchEngine == 1) {
      $("#duckduckgo-engine").addClass("selected");
    } else if (searchEngine == 2) {
	  $("#github-engine").addClass("selected");
    } else {
      $("#youtube-engine").addClass("selected");
    }

  }

};
