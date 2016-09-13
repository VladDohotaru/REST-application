'use strict';

$('#postProducts').click(() => {
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
    url:         'http://localhost:3000/admin_profile/catalog/' + id,
    data:        JSON.stringify(jsonData),
    contentType: 'application/json; charset=UTF-8',
    dataType:    'json'
  };
  $.ajax(postOptions)
    .done((srvSuccessResponse) => {
      $('#output');
      let fullData = '';
      fullData += JSON.stringify(srvSuccessResponse, null, 2);
      $('#output').html('JSON content of the requested page:\n' + fullData);
    })
    .fail((xhr, srvFailResponse) => {
      $('#output');
      let fullData = '';
      fullData += JSON.stringify(srvFailResponse, null, 2);
      $('#output').html('JSON content of the requested page:\n' + fullData);
      alert('Status code: ' + xhr.status + ' Reason: ' + xhr.statusText + '\n');
    });
});
