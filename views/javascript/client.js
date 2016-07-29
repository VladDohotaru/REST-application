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
    const id = $('#getId').val();
    const getOptions = {
      type:        'GET',
      url:         'http://localhost:3000/profile/catalog/' + id,
      contentType: 'application/json; charset=UTF-8',
    };
    $.ajax(getOptions)
      .done(successHandler)
      .fail(generalErrorHandler);
  });

  $('#post').click(() => {
    const id = $('#getId').val();
    let jsonData;
    let getJsonData = $('#input').val();
    try {
      jsonData = JSON.parse(getJsonData);
    } catch (e) {
      alert(e);
      jsonData = {};
    }
    const postOptions = {
      type:        'POST',
      url:         'http://localhost:3000/profile/catalog/' + id,
      data:        JSON.stringify(jsonData),
      contentType: 'application/json; charset=UTF-8',
      dataType:    'json'
    };
    $.ajax(postOptions)
      .done(successHandler)
      .fail(generalErrorHandler);
  });

  $('#put').click(() => {
    const id = $('#getId').val();
    let jsonData;
    let getJsonData = $('#input').val();
    try {
      jsonData = JSON.parse(getJsonData);
    } catch (e) {
      alert(e);
      jsonData = {};
    }
    const putOptions = {
      type:        'PUT',
      url:         'http://localhost:3000/profile/catalog/' + id,
      data:        JSON.stringify(jsonData),
      contentType: 'application/json; charset=UTF-8',
      dataType:    'json'
    };
    $.ajax(putOptions)
      .done(successHandler)
      .fail(generalErrorHandler);
  });

  $('#delete').click(() => {
    const id = $('#getId').val();
    const deleteOptions = {
      type:        'DELETE',
      url:         'http://localhost:3000/profile/catalog/' + id,
      contentType: 'application/json; charset=UTF-8'
    };
    $.ajax(deleteOptions)
      .done(successHandler)
      .fail(generalErrorHandler);
  });
});
