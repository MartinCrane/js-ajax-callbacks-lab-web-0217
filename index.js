function handlebarsSetup() {
  //put any handlebars setup in here
  Handlebars.registerPartial("userDetails", $("#user-details-partial").html())
}

$(document).ready(function (){
  handlebarsSetup()
});

$( "#searchTermsClick" ).click(searchRepositories);

function displayError() {
  $('#errors').html("I'm sorry, there's been an error. Please try again.")
}

function searchRepositories() {
    let term = document.getElementById('searchTerms').value
    $.get(`https://api.github.com/search/repositories?q=${term}`, function(response) {
      let templateGet = document.getElementById("results-template").innerHTML
      let template = Handlebars.compile(templateGet)
      let repoList = template(response)
      document.getElementById("results").innerHTML = repoList
      $("#sentences").html(response);
   }).fail(function (error) {
     displayError();
   });
 }

 function showCommits(event, data) {
    let url = data.id.slice(0,-6)
    $.get(url, function(response) {
     let templateGet = document.getElementById("details-template").innerHTML
     let template = Handlebars.compile(templateGet)
     let repoList = template(response)
     document.getElementById("details").innerHTML = repoList;
 }).fail(function (error) {
   displayError();
 })
 }
