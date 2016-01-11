var express = require('express');
var bodyParser = require('body-parser')
var http = require('http');

var Twitter = require('twitter-node-client').Twitter;

var app = express();
//app.set('port',process.env.PORT || 8080);
app.set('port', process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 8080);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({ extended: true }));

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});


app.get('/', function(request, response) {

    response
    .render('index', {

        title: '¡Hola, Express!',
        username: 'oscar'

    });

});


app.get('/users/:userName', function(request, response) {

    var name = request.params.userName;

    response.send('¡Hola, ' + name + '!');

});

app.get("/cabeceras/", function(request, response) {

    response.send(request.get('user-agent'));

});

app.get("/content-types/", function(request, response) {

    var lenguages = request.acceptedLanguages;
    console.log(lenguages);
    response.send('soporto'+lenguages);

});

/////////////////////////////// test Twitter

//Callback functions
  var error = function (err, response, body) {
      console.log('ERROR [%s]', err);
  };
  var success = function (data) {
      console.log('Data [%s]', data);
  };

  var success_retweets = function (data) {
    console.log('Retweets recibidos [%s]', data);
    var jsonContent = JSON.parse(data);
    console.log("\n linea \n %j",jsonContent[3]);
  }


  var success_busqueda = function (data) {
    //console.log('hastag hats recibidos [%s]', data);
    var hatjsonContent = JSON.parse(data);
    var numelementos = hatjsonContent.statuses.length;

    for (i = 0; i < hatjsonContent.statuses.length; i++) {
        console.log("\n linea \n %j %j %j",hatjsonContent.statuses[i].id,hatjsonContent.statuses[i].text, hatjsonContent.statuses[i].metadata);
    }
    //console.log(numelementos);
    //console.log("\n linea \n %j %j %j",hatjsonContent.statuses[0].id,hatjsonContent.statuses[0].text, hatjsonContent.statuses[0].metadata);
    //console.log("\n linea \n %j %j %j",hatjsonContent.statuses[1].id,hatjsonContent.statuses[1].text,hatjsonContent.statuses[1].metadata);

  }


  var Twitter = require('twitter-node-client').Twitter;

  //Get this data from your twitter apps dashboard
  var config = {
      "consumerKey": "njyd6gOc0R5PqHRMMajiaH5iw",
      "consumerSecret": "9UgXzO9Uhier18WAT5hqOkyln89pqUB0J7s9vZVgTLUg1VtLaG",
      "accessToken": "168118562-rZHzPOWaDCLk7JEoACCgdVvv4jLyUxIMoCyongjo",
      "accessTokenSecret": "1lXvQiG53S8ubR5iZrbPKW8Uy4LyIQltaXnlArAtGinrU"
      //,
      //"callBackUrl": "XXX"
  }
  var twitter = new Twitter(config);

      //Example calls

      //twitter.getUserTimeline({ screen_name: 'luissuarezortiz', count: '10'}, error, success);

      twitter.getMentionsTimeline({ count: '1'}, error, success);



      //twitter.getHomeTimeline({ count: '10'}, error, success);

//      twitter.getReTweetsOfMe({ count: '10'}, error, success_retweets);
      //twitter.getTweet({ id: '1111111111'}, error, success);


      //
      // Get 10 tweets containing the hashtag haiku
      //

      twitter.getSearch({'q':'#tocados','count': 4}, error, success_busqueda);
      //
      // Get 10 popular tweets with a positive attitude about a movie that is not scary
      //

      //twitter.getSearch({'q':' movie -scary :) since:2013-12-27', 'count': 10, 'result\_type':'popular'}, error, success);
