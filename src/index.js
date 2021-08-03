import $, { data } from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

$(document).ready(function() {
  $("#gif-form").submit(function(event) {
    event.preventDefault();
    const search = $("#search").val();
    $("#search").val("");
    $('#images').empty();

    let promise = new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      const url = `https://api.giphy.com/v1/gifs/search?api_key=QBqi00wNExLgAPndA7LpZ6V2026lx2Yr&q=${search}&limit=10&offset=0&rating=g&lang=en`;
      request.onload = function() {
        if(this.status === 200) {
          resolve(request.response);
        }else {
          reject(request.response);
        }
      };
      request.open("GET", url, true);
      request.send();
    });
    promise.then(function(response) {
      const body = JSON.parse(response);
      console.log(body);
      console.log(data);
      for(let i = 0; i < body.data.length-1; i++) {
        $('#images').append(`<img src=${body.data[i].images.downsized.url}>`);
      }
    });
  });
});

