'use strict';

$('#deleteProducts').click(() => {
  const id = $('#getId').val();
  const deleteOptions = {
    type:        'DELETE',
    url:         'http://localhost:3000/admin_profile/catalog/' + id,
    contentType: 'application/json; charset=UTF-8'
  };
  $.ajax(deleteOptions)
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
