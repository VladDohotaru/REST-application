'use strict';

$(document).ready( () => {
  $('#get').click(() => {
    let id = $('#getId').val();
    $.ajax({
      type:        'GET',
      url:         'http://localhost:3000/profile/catalog/' + id,
      contentType: 'application/json; charset=UTF-8',
      success:     (jd) => {
        $('#output');
        let fullData = '';
        fullData += JSON.stringify(jd, null, 2);
        $('#output').html('JSON content of the requested page:\n' + fullData);
      },
      error: (xhr) => {
        let error;
        try {
          error = JSON.parse(xhr.responseText);
        } catch (e) {
          console.log(e);
          error = {};
        }
        alert(xhr.status + ' ' + xhr.statusText + '\n' + error.reason);
      }
    });
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
    $.ajax({
      type:        'POST',
      url:         'http://localhost:3000/profile/catalog/',
      data:        JSON.stringify(jsonData),
      contentType: 'application/json; charset=UTF-8',
      dataType:    'json',
      success:     (jd) => {
        $('#output');
        let fullData = '';
        fullData += JSON.stringify(jd, null, 2);
        $('#output').html('JSON content of the requested page:\n' + fullData);
      },
      error: (xhr) => {
        let error;
        try {
          error = JSON.parse(xhr.responseText);
        } catch (e) {
          console.log(e);
          error = {};
        }
        alert(xhr.status + ' ' + xhr.statusText + '\n' + error.reason);
      }
    });
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
    $.ajax({
      type:        'PUT',
      url:         'http://localhost:3000/profile/catalog/' + id,
      data:        JSON.stringify(jsonData),
      contentType: 'application/json; charset=UTF-8',
      dataType:    'json',
      success:     (jd) => {
        $('#ouput');
        let fullData = '';
        fullData += JSON.stringify(jd, null, 2);
        $('#output').html(fullData);
      },
      error: (xhr) => {
        let parsedError;
        try {
          parsedError = JSON.parse(xhr.responseText);
        } catch (e) {
          console.log(e);
          parsedError = {};
        }
        alert(xhr.status + ' ' + xhr.statusText + '\n' + parsedError.reason);
      }
    });
  });

  $('#delete').click(() => {
    let id = $('#getId').val();
    $.ajax({
      type:        'DELETE',
      url:         'http://localhost:3000/profile/catalog/' + id,
      contentType: 'application/json; charset=UTF-8',
      success:     () => {
        $('#output');
        $('#output').html('To see updated JSON after delete, make GET request!');
      },
      error: (xhr) => {
        let error;
        try {
          error = JSON.parse(xhr.responseText);
        } catch (e) {
          console.log(e);
          error = {};
        }
        alert(xhr.status + ' ' + xhr.statusText + '\n' + error.reason);
      }
    });
  });
});
