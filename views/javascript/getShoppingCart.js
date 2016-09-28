'use strict';
$('#getCart').click(() => {
  const getOptions = {
    type:        'GET',
    url:         'http://localhost:3000/admin_profile/myShoppingCart',
    contentType: 'application/json; charset=UTF-8',
    success:     (result) => {
      let fullData = '';
      fullData += JSON.stringify(result, null, 2);
      $('#output').html(fullData);
      console.log(fullData + 'pizdariki');
    }
  };
  $.ajax(getOptions)
  .fail((xhr, jsonData) => {
    $('#output');
    let fullData = '';
    fullData += JSON.stringify(jsonData, null, 2);
    $('#output').html('JSON content of the requested page:\n' + fullData);
    alert('Status code: ' + xhr.status + ' Reason: ' + xhr.statusText + '\n');
  });
});
