$(document).ready(function() {

  (function() {

    // Variables
    const $searchTxt = $("#searchTxt");
    const $searchBtn = $("#searchBtn");
    const $results = $("#results");
    const youtubeURL = "https://www.googleapis.com/youtube/v3/search";
    const $collection = $(".collection");



    //event listener
    $searchBtn.on("click", function() {

      let query = $searchTxt.val();

      //checks if more then 3 char
      if (query.length > 3) {

        $results.fadeIn(50000);

        handleSearch(query);
      } else {
        $searchTxt.focus();
      }

    });

    function handleSearch(query) {

      // jQuery GET request
      // hitting the Youtube URL
      // sending the request obj with the query included

      $.get(youtubeURL, {
          'maxResults': '25',
          'part': 'snippet',
          'q': query,
          'type': '',
          key: 'AIzaSyAMT_DtDaCn0trvyqUGKIjKk2rEvNvQnnE'
        },
        function(data) {
          //call the handleData function
          handleData(data);
        }) // end of $.get

    }; // end of handleSearch()

    // JSON data passed in
    // Take the data and plug into HTML
    function handleData(data) {

      // clearing the items inside
      // when performing second search
      $results.html = "";

      // loop through all the data obj
      data.items.forEach((currentValue, index, array) => {



        let vidID = currentValue.id.videoId;
        let channelId = currentValue.snippet.channelId;
        let imageURL = currentValue.snippet.thumbnails.medium.url;

        //call the generateHTML passing in the required info
        generateHTML(vidID, channelId, imageURL)

      }) // end of for each

    }; // end of handleData()

    function generateHTML(vidID, channelId, imageUrl) {

      let videoUrl = "https://www.youtube.com/watch?v=" + vidID;
      let creatorUrl = "https://www.youtube.com/channel/" + channelId;
      let HTML_TEMPLATE = '<li class="collection-item">' +
        '<a href="' +
        videoUrl +
        '">' +
        '<div class="image-container">' +
        '<img class="image" src="' +
        imageUrl +
        '" alt="">' +
        '</div>' +
        '</a>' +

        '</li>';

      // add the built HTML template to the results div
      $results.append(HTML_TEMPLATE);

    } // end of generateHTML



  })(); // end function

}); // end of doc ready
