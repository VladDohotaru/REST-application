'use strict';
$('#output').on('click', 'button.make-admin', function makeAdmin (event) {
  event.preventDefault();
  $.ajax({
    type:    'PUT',
    data:    {'username': $(this).data('user')},
    url:     'admin_profile/users/set_admin',
    success: () =>  {
      $('#output').html('User is admin now!');
    },
    error: (err) => {
      console.log(err + 'err');
    }
  });
});
