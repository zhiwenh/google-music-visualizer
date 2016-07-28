//"use strict";
//var form = document.getElementById("form");
var form = $('#form');
var body = $('body');
var box = $('#box');

// jquery test
var newBox = $('<div><h1>Auto TL;DR</h1></div>');
newBox.css({'background-color': '#eee'});
body.append(newBox);
var container = "<div id='container'><em>Summary:</em></div>"
$("body").append(container);
var summary = '<div id="summ-div"></div>';
$("#container").append(summary)

// pass in the jquery file and scraping script into the current page
chrome.tabs.executeScript(null, {file: "scripts/jquery-3.0.0.min.js"}, function() {
  chrome.tabs.executeScript(null, {file: "scripts/scrape.js"});
});

chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
    var url = tabs[0].url;
  $.getJSON("http://api.smmry.com/&SM_API_KEY=DA41C62EB0&SM_LENGTH=5&SM_URL=" + url, function(data) {
    $("#summ-div").prepend(data.sm_api_content)
//  //append data to popup page somewhere
  })
});




chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    body.append('<div id="article-links-div" class="links-div" data-role="collapsible"><h3 id="article-links">Article links:</h3></div>');
    $("#article-links-div").append("<div class='content' id='article-content'></div>")
    request.article.forEach(function(element) {
              var href = element.href;
        var text = element.text;
      if (element.text.indexOf('img') === -1) 
        $("#article-content").append('<a class="anchor-links" href="' + href + '"><p>' + text + '</p></a>')
       
    })

    // body.append('<div id="section-links-div" class="links-div" data-role="collapsible"><h3 id="section-links">Section links:</h3></div>') ;
    // $("#section-links-div").append("<div class='content' id='section-content'></div>")
    // request.section.forEach(function(element) {
    //   var href = element.href;
    //   var text = element.text;
    //   if (element.text.indexOf('img') === -1)
    //   $("#section-content").append('<a class="anchor-links" href="' + href + '"><p>' + text + '</p></a>')      
    // });

    body.append('<div id="footer-links-div" class="links-div" data-role="collapsible"><h3 id="footer-links">Footer links:</h3></div>') ;
    $("#footer-links-div").append("<div class='content' id='footer-content'></div>")
    request.footer.forEach(function(element) {
      var href = element.href;
      var text = element.text;
      if (element.text.indexOf('img') === -1)
      $("#footer-content").append('<a class="anchor-links" href="' + href + '"><p>' + text + '</p></a>')      
    });
    
    $(".links-div").on('click', function(){
      var $head = $(this);
      var $content = $($head).find(".content");
      $('html, body').animate({
      scrollTop: $(this).offset().top
      }, 500);
      $content.slideToggle();
});
  });




// for dynamic popup window open
var heightSize = 0;
var widthSize = 0;

function sizeIncrease(timestamp) {
  if (heightSize <= 480) heightSize += 30;
  if (widthSize <= 220) widthSize += 14;
  body.style.height = heightSize + "px";
  body.style.width = widthSize + "px";
  if (widthSize <= 220 || heightSize <= 480) {
    window.requestAnimationFrame(sizeIncrease);
  } else form.submit();
}
window.requestAnimationFrame(sizeIncrease);
