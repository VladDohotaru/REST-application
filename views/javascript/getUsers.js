'use strict';

$('#getUsers').click(() => {
  const id = $('#getId').val();
  $.ajax({
    type:        'GET',
    url:         'http://localhost:3000/admin_profile/users/' + id,
    contentType: 'application/json; charset=UTF-8',
    success:     (result) => {
      $('#output').empty();
      var content = '<table><tr><th>Nr</tb><th>Username</th><th>Group</th>';
      $.each(result, (index, value) => {
        content += '' +
        '<tr>' +
        '<td>' + value.id + '</td>' +
        '<td>' + value.username + '</td>' +
        '<td>' + value.group + '</td>' +
        '<td><button class="make-admin" data-user="' + value.username + '">Set admin</button></td>';
      });
      content += '</table>';
      $('#output').html(content);
    },
    error: (err) => {
      console.log(err);
    }
  });
});
