var topics = ['seinfeld', 'da ali g show', 'south park', 
'curb your enthusiasm', 'the sopranos', 'the wire', 'mad men', 
'breaking bad', 'game of thrones', 'black mirror', 
'better call saul', 'extras', 'alf'];

$(document).ready(function(){
    createButtons();
    
  $( "body" ).delegate( "button", "click", function() {
    populateGifs($(this));    
  });      

  $("#findShow").on("click", function() {  
    event.preventDefault();  
    var input = $("#tv-input").val().trim();    

    if (input != "") {
        var $btn = $("<button id='newButton' class='btn btn-primary'>");
        $btn.text(input);
        
        $("#buttons-here").append($btn);
    }    
  });
  
  $( "body" ).delegate( "img", "click", function() {
    animateGifs($(this));    
  });    
  
});

function animateGifs(index) {	
	var id = index.attr("id");		
	var src = index.attr("src");
	
	if (index.attr("id").length == 2) {
		src = src.replace("_s.gif",".gif");			
		index.attr("id",id.charAt(0));
	} 
  else {		
		src = src.replace(".gif","_s.gif");
		index.attr("id",id+"s");
	}
	
	index.attr("src",src);	
}

function createButtons(){	
	for (var i = 0; i < topics.length; i++) {
		var $btn = $("<button id='newButton' class='btn btn-primary'>");
		$btn.text(topics[i]);
		$("#buttons-here").append($btn);
	}	
}

function populateGifs(show) {     
      show = show.html();
	    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
      show + "&api_key=dc6zaTOxFJmzC&limit=10";      
      var $gifs = $("#gifs-here");

      $.ajax({
        url: queryURL,
        method: "GET"
      }).done(function(response) {        
                        
        var results = response.data;        
        $gifs.html("");                

        for (var i = 0; i < results.length; i++) {              
            var animalDiv = $("<div>");
            var p = $("<p>").text("Rating: " +results[i].rating);            

            var animalImage = $("<img>");
			      animalImage.attr("id", i + "s");
            animalImage.attr("src", results[i].images.fixed_height_still.url);

            animalDiv.append(p);
            animalDiv.append(animalImage);

            $gifs.prepend(animalDiv);
        }
    });    
}
