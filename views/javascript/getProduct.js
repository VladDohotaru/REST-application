'use strict';
$('#getProducts').click(() => {
  const id = $('#getId').val();
  const getOptions = {
    type:        'GET',
    url:         'http://localhost:3000/admin_profile/catalog/' + id,
    contentType: 'application/json; charset=UTF-8',
    success:     (result) => {
      $('#output').empty();
      var content = '<table><tr><th>ID</th><th>Title</th><th>Price</th><th>Description</th>';
      $.each(result, (index, value) => {
        content += '' +
        '<tr>' +
        '<td>' + value.productId + '</td>' +
        '<td>' + value.productTitle + '</td>' +
        '<td>' + value.productPrice + '</td>' +
        '<td>' + value.productDescription + '</td>' +
        '<td><button class="order" data-user="' + value + '">Add to cart</button></td>';
      });
      content += '</table>';
      $('#output').html(content);
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
