// Page Elements

var engadget = document.getElementById('engadget');
var recode = document.getElementById('recode');
var nextWeb = document.getElementById('nextWeb');
var egypt = document.getElementById('egypt');
var main = document.getElementsByTagName('main')[0];



// News API Data

var apiKey = 'af0f865d44414102884021a59d2e51c4';
var engadgetUrl = 'https://newsapi.org/v2/top-headlines?country=ng&apiKey=af0f865d44414102884021a59d2e51c4';
var recodeUrl = 'https://newsapi.org/v2/top-headlines?country=za&apiKey=af0f865d44414102884021a59d2e51c4';
var nextWebUrl = 'https://newsapi.org/v2/top-headlines?country=ma&apiKey=af0f865d44414102884021a59d2e51c4';
var egyptUrl = 'https://newsapi.org/v2/top-headlines?country=eg&apiKey=af0f865d44414102884021a59d2e51c4';

// Request News Function
var getNews = async(url) => {
     let response = await fetch(url);
     let jsonResponse = await response.json();
  console.log(jsonResponse);
  let articlesArray = jsonResponse.articles.slice(0, 10);
  //console.log(articlesArray);
  return articlesArray;
  
}
// Render Function

function renderNews(articles) {
  articles.map((article, index) => {
  let articleRow =
      '<div class="articlerow">' +
      ' <div class="article">' +
      '   <h2 class="title">' + article.title + '</h2>' +
      '   <h3>By ' + article.author + '</h3>' +
      '   <p> ' + article.description + '</p>' +
      '   <a href="' + article.url + '" target="_blank" class="readmore"><p>Read More</p></a>' +
      ' </div>' +
      ' <div class="share">' +
      '   <img class="storyimage" src="' + article.urlToImage + '" />' +
      '   <a href="https://twitter.com/" target="_blank"><button type="button" class="tweet" id="tweet ' + index + '">' +
      '   <i class="fa fa-twitter" aria-hidden="true"></i>Tweet This</button></a>' +
      ' </div>' +
      '</div>';

    main.innerHTML += articleRow;
  });
  return articles;
}

// Post Tweet Function

function sendTweets(newsObjects) {
  let tweetButtons = document.getElementsByClassName('tweet');
  for (let i = 0; i < tweetButtons.length; i++) {
    tweetButtons[i].addEventListener('click', function() {
      // Call Post Status function here
      Twitter.postStatus(newsObjects[i].url);
      tweetButtons[i].innerHTML = "Tweeted";
    }, false);
  }
}

// Button Event Listeners

engadget.addEventListener('click', function() {
  main.innerHTML = ' ';
  // Call getNews() here
  getNews(engadgetUrl).then(articlesArray => renderNews(articlesArray)).then(articles => sendTweets(articles));
}, false);

recode.addEventListener('click', function() {
  main.innerHTML = ' ';
  // Call getNews() here
  getNews(recodeUrl).then(articlesArray => renderNews(articlesArray)).then(articles => sendTweets(articles));
}, false);

nextWeb.addEventListener('click', function() {
  main.innerHTML = ' ';
  // Call getNews() here
  getNews(nextWebUrl).then(articlesArray => renderNews(articlesArray)).then(articles => sendTweets(articles));
}, false);

egypt.addEventListener('click', function() {
  main.innerHTML = ' ';
  // Call getNews() here
  getNews(egyptUrl).then(articlesArray => renderNews(articlesArray)).then(articles => sendTweets(articles));
}, false);
