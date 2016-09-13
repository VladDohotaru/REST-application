'use strict';
$('#output').on('click', 'button.make-admin', function makeAdmin (event) {
  event.preventDefault();
  console.log($(this).data('user'));
  $.ajax({
    type:    'PUT',
    data:    {'username': $(this).data('user')},
    url:     '/set_admin',
    success: () =>  {
      $('#output').html('User is admin now!');
    },
    error: (err) => {
      console.log(err + 'err');
    }
  });
});
