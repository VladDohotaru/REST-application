'use strict';

function successHandler (jsonData) {
  $('#output');
  let fullData = '';
  fullData += JSON.stringify(jsonData, null, 2);
  $('#output').html('JSON content of the requested page:\n' + fullData);
};

function generalErrorHandler (xhr) {
  alert('Status code: ' + xhr.status + ' Reason: ' + xhr.statusText + '\n');
};

window.history.forward(1);
$(document).ready( () => {
  $('#get').click(() => {
    let id = $('#getId').val();
    $.ajax({
      type:        'GET',
      url:         'http://localhost:3000/profile/catalog/' + id,
      contentType: 'application/json; charset=UTF-8',
    })
    .done(successHandler)
    .fail(generalErrorHandler);
  });

  $('#post').click(() => {
    let jsonData;
    let getJsonData = $('#input').val();
    try {
      jsonData = JSON.parse(getJsonData);
    } catch (e) {
      alert(e);
      jsonData = {};
    }
    let postPromise = $.ajax({
      type:        'POST',
      url:         'http://localhost:3000/profile/catalog/',
      data:        JSON.stringify(jsonData),
      contentType: 'application/json; charset=UTF-8',
      dataType:    'json'
    });
    postPromise
      .done(successHandler)
      .fail(generalErrorHandler);
  });

  $('#put').click(() => {
    let id = $('#getId').val();
    let jsonData;
    let getJsonData = $('#input').val();
    try {
      jsonData = JSON.parse(getJsonData);
    } catch (e) {
      alert(e);
      jsonData = {};
    }
    let putPromise = $.ajax({
      type:        'PUT',
      url:         'http://localhost:3000/profile/catalog/' + id,
      data:        JSON.stringify(jsonData),
      contentType: 'application/json; charset=UTF-8',
      dataType:    'json'
    });
    putPromise
      .done(successHandler)
      .fail(generalErrorHandler);
  });

  $('#delete').click(() => {
    let id = $('#getId').val();
    let deletePromise = $.ajax({
      type:        'DELETE',
      url:         'http://localhost:3000/profile/catalog/' + id,
      contentType: 'application/json; charset=UTF-8'
    });
    deletePromise
      .done(successHandler)
      .fail(generalErrorHandler);
  });
});
