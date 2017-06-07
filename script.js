// var skycons = new Skycons({"color": "pink"});

// skycons.add("icon1", Skycons.PARTLY_CLOUDY_DAY);
// skycons.play();


var todayElement = $('.today')
var tomorrowElement = $('.tomorrow')
var theNextDayElement = $('.the-next-day')
var dateElement = $('.date')

function getWeather(coordinates) {
    
    $.ajax({
        url: `https://api.darksky.net/forecast/cd571df4d7d9d518a887515b482e5e04/${coordinates.lat},${coordinates.lng}`,
        jsonp: "callback",
        dataType: "jsonp",
        success: function(response) {
            console.log('my weather data ', response);
            
            var day1Data = response.daily.data[0]
            var day2Data = response.daily.data[1]
            var day3Data = response.daily.data[2]
            
            todayElement.find('.high').text('high: ' + day1Data.temperatureMax + '°F')
            tomorrowElement.find('.high').text('high: ' + day2Data.temperatureMax + '°F')
            theNextDayElement.find('.high').text('high: ' + day3Data.temperatureMax + '°F')
            
            todayElement.find('.low').text('low: ' + day1Data.temperatureMin + '°F')
            tomorrowElement.find('.low').text('low: ' + day1Data.temperatureMin + '°F')
            theNextDayElement.find('.low').text('low: ' + day1Data.temperatureMin + '°F')
            
            
            dateElement.find('.date-header').text(moment.unix(day1Data.time).format('MMMM Do, YYYY'))
            console.log(day1Data)
            console.log(response.daily.data[0])
            // console.log(dateElement.text.moment.unix(response.daily.data[0]).format('dddd'))
             
            
            
            // dateElement.text((time/2629743 + 1) + '.' + (time/86400 +1) + '.' + (time/31556926 + 1970))
            
            // $(".today").append('high: ' + response.daily.data[0].temperatureMax + ' low: ' + response.daily.data[0].temperatureMin);
            // $(".weather-data-tues").append('high: ' + response.daily.data[0].temperatureMax + ' low: ' + response.daily.data[0].temperatureMin);
        }
    });
};


function getLocation(location) {
    
    $.ajax({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=AIzaSyAe0W67BrQdD18-VRyFWsOQWHOzu8CRkrk`,
        success: function(response) {
            console.log('my location data ', response);
            getWeather(response.results[0].geometry.location);
        }
    });
}
    
    



$(document).ready(function() {
    $("#citySearch").keypress(function(event){
    
        if(event.which == 13) {
            console.log($("#citySearch").val())
            getLocation($("#citySearch").val())
        }
    });
    
    $(".temp").hide()
    $(".today").hover(function() {
        $("#temp-today").fadeIn(400)
    },
    function() {
        $("#temp-today").hide()
    });
    
    $(".tomorrow").hover(function() {
        $("#temp-tomorrow").fadeIn(400)
    },
    function() {
        $("#temp-tomorrow").hide()
    });
    
    $(".the-next-day").hover(function() {
        $("#temp-the-next-day").fadeIn(400)
    },
    function() {
        $("#temp-the-next-day").hide()
    });
    
});




    // var isMouseoverToday = false;
    // var isMouseoverTomorrow = false;
    // var isMouseoverTheNextDay = false;
    
    // $(".today").mouseover(function() {
    //     isMouseoverToday = true;
    // });
    // $(".tomorrow").mouseover(function() {
    //     isMouseoverToday = true;
    // });
    // $(".the-next-day").mouseover(function() {
    //     isMouseoverToday = true;
    // });
    
    // if(isMouseoverToday===true) {
    //     $("#temp-today").show(300)
    // } else if (isMouseoverTomorrow===true){
    //     $("#temp-tomorrow").show(300)
    // } else if (isMouseoverTheNextDay===true){
    //     $("#temp-the-next-day").show(300)
    // }