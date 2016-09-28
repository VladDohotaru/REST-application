'use strict';

$('#output').on('click', 'button.order', function addToCart (event) {
  event.preventDefault();
  let id = {id:$(this).data('user')};
  $.ajax({
    type:        'PUT',
    data:        JSON.stringify(id),
    url:         '/admin_profile/add_to_cart',
    contentType: 'application/json; charset=UTF-8',
    dataType:    'text',
    success:     (result) =>  {
      $('#output').html('Added to your shopping cart!' + result);
    },
    error: (err) => {
      console.log(err + 'err');
    }
  });
});
