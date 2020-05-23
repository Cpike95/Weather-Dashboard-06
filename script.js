function searchTable() {
          //create a list item under the search box//give the list and list-item the class of the bootstrap list
          //add the searched city to the new list//append the list to the ul //append the ul to the search container
          var cityLists = $('.search-list');
          for (var i =0; i < cityLists.length; i++) {
            var list = $("<tr>");
            var listItem = $("<td>");
            listItem.attr('data-city');
            listItem.attr('data-list', 'listed');
            listItem.addClass("list-group-item search");
            listItem.text($("#searched-city").val());
            list.append(listItem);
            list.addClass("list-group");
            $('.search-list').append(list);
  }
}
  // function that will search for the city and append the weather data to the page.
  $(".search").on("click", function searchedWeather(event) {    
          event.preventDefault();
        //use the 5 day weather forcast to get todays weather fr the requested city
        var city = $("#searched-city").val();
        var weatherData = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=4bbee4513548752cd5eefcd153dee9a9";        
   
        $.ajax({
          url: weatherData,
          method: "GET"
          }).then(function(response) {
            var currentIcon = "https://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png";
            $("#city-name").html(response.name + " " + moment().format('M/D/YYYY') + '' + '<img id="city-icon" src='+ currentIcon +'></img>' );
            $("#temp").html("Temperature: " + (Math.floor(response.main.temp - 273.15) * 1.80 + 32)) + "˚F";
            $("#humid").html("Humidity: " + response.main.humidity + "%");
            $("#wind").html("Wind speed: " + response.wind.speed + "MPH");
            $("#uv").html("UV Index: " + response.uvi);      
            // Uv index api calls
            var latitude = response.coord.lat; 
            var longitude = response.coord.lon; 

            //* AJAX URL Variable for UV Index
            var uvRays = 'https://api.openweathermap.org/data/2.5/uvi?appid=4bbee4513548752cd5eefcd153dee9a9'  + '&lat=' + latitude + '&lon=' + longitude;
              //* AJAX to call new API for UV Index using Long & Lat
              $.ajax({
                url: uvRays,
                method: 'GET',
              }).then(function (uvIndex) {
                $("#uv").html('<b>UV Index:</b> ' + uvIndex.value);

                    //* If Else Statement to set the background color for uvIndex depending on the UV Index Value
                    if (uvIndex.value < 3) {
                      $("#uv").css('background-color', 'green');
                    } else if (uvIndex.value >= 3 && uvIndex.value <= 5) {
                      $("#uv").css('background-color', 'yellow');
                    } else if (uvIndex.value > 5 && uvIndex.value <= 7) {
                      $("#uv").css('background-color', 'orange');
                    } else if (uvIndex.value > 7 && uvIndex.value < 11) {
                      $("#uv").css('background-color', 'red');
                    } else if (uvIndex.value >= 11) {
                      $("#uv").css('background-color', 'violet');
                    }
                });
              // 5 day weather forcast, get the temp and humidity for the following days by selecting the json array object
              
          var forcast = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=4bbee4513548752cd5eefcd153dee9a9";
          $.ajax({
              url: forcast,
              method: "GET"
            }).then(function(response) {
                    //add the following days using the moment library methods
                    var nextDay = new moment().add(1, 'day').format('M/D/YYYY');
                    var twoDay = new moment().add(2, 'day').format('M/D/YYYY');
                    var threeDay = new moment().add(3, 'day').format('M/D/YYYY');
                    var fourDay = new moment().add(4, 'day').format('M/D/YYYY');
                    var fiveDay =  new moment().add(5, 'day').format('M/D/YYYY');
                    // append the moment day to the DOM/ forcast cards
                    $("#day-one").text(nextDay);
                    $("#day-two").text(twoDay);
                    $("#day-three").text(threeDay);
                    $("#day-four").text(fourDay);
                    $("#day-five").text(fiveDay);
            
                  // append the data: icon, temp and humidity to the cards 
                  var day1 = "https://openweathermap.org/img/wn/" + response.list[0].weather[0].icon + ".png";
                  $('.day1').html('<img src=' + day1 + '></img>');
                  $('.card-one').html("<b>Temp:</b>" +" "+ (Math.floor(response.list[0].main.temp - 273.15) * 1.80 + 32) + "˚F" + "\n" + "<b>Humidity:</b>" +" "+ response.list[0].main.humidity + "%");
                  
                  var day2 = "https://openweathermap.org/img/wn/" + response.list[1].weather[0].icon + ".png";
                  $('.day2').html('<img src=' + day2 + '></img>');
                  $('.card-two').html("<b>Temp:</b>" +" "+ (Math.floor(response.list[1].main.temp - 273.15) * 1.80 + 32) + "˚F" + "\n" + "<b>Humidity:</b>"+" "+ response.list[1].main.humidity + "%");
                  
                  var day3 = "https://openweathermap.org/img/wn/" + response.list[2].weather[0].icon + ".png";
                  $('.day3').html('<img src=' + day3 + '></img>');
                  $('.card-three').html("<b>Temp:</b>" +" "+ (Math.floor(response.list[2].main.temp - 273.15) * 1.80 + 32) + "˚F" + "\n" + "<b>Humidity:</b>"+" "+ response.list[2].main.humidity + "%");
                  
                  var day4 = "https://openweathermap.org/img/wn/" + response.list[3].weather[0].icon + ".png";
                  $('.day4').html('<img src=' + day4 + '></img>');
                  $('.card-four').html("<b>Temp:</b>" +" "+ (Math.floor(response.list[3].main.temp - 273.15) * 1.80 + 32) + "˚F" + "\n" + "<b>Humidity:</b>"+" "+ response.list[3].main.humidity + "%");
                  
                  var day5 = "https://openweathermap.org/img/wn/" + response.list[4].weather[0].icon + ".png";
                  $('.day5').html('<img src=' + day5 + '></img>');
                  $('.card-five').html("<b>Temp:</b>" + " " + (Math.floor(response.list[4].main.temp - 273.15) * 1.80 + 32) + "˚F" + "\n" + "<b>Humidity:</b>"+" "+ response.list[4].main.humidity + "%");
              });
  
      function getCity() {
         // If the city is already on the list, then use the data attribute with the city name to pull up the Weather
         if (localStorage.getItem('data-cityList') === 'listed') {
          var citiesArr = {}; 
          localStorage.setItem('city', JSON.stringify(citiesArr));
          console.log(citiesArr);

        }
        // Else, use the previous HTML value of the search button, which is the input text area as the city name to search in the API
        else if (localStorage.getItem('city') !== null) {
           cityName = $(this).prev().val();
        }
       }
      //  function setCitySearch () {
      //       var cities = $("#searched-city").val();
      //       var citySearch = $(this).attr('data-city');
      //       var searchlist = JSON.parse(localStorage.getItem('city'))
      //       searchlist[citySearch] = cities;
      //       localStorage.setItem('city', JSON.stringify(searchlist));
              
      // }  
      searchTable();
      $("#searched-city").val("");     
      getCity();
      // setCitySearch();
     
   });
});
