'use strict';

function successHandler (jsonData) {
  $('#output');
  let fullData = '';
  fullData += JSON.stringify(jsonData, null, 2);
  $('#output').html('JSON content of the requested page:\n' + fullData);
};

function generalErrorHandler (xhr, jsonData) {
  $('#output');
  let fullData = '';
  fullData += JSON.stringify(jsonData, null, 2);
  $('#output').html('JSON content of the requested page:\n' + fullData);
  alert('Status code: ' + xhr.status + ' Reason: ' + xhr.statusText + '\n');
};

function getProduct () {
  const id = $('#getId').val();
  const getOptions = {
    type:        'GET',
    url:         'http://localhost:3000/catalog/' + id,
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
  .fail(generalErrorHandler);
};

function getUsers () {
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
};



function postProduct () {
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
    .done(successHandler)
    .fail(generalErrorHandler);
};

function putProducts () {
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
    url:         'http://localhost:3000/admin_profile/catalog/' + id,
    data:        JSON.stringify(jsonData),
    contentType: 'application/json; charset=UTF-8',
    dataType:    'json'
  };
  $.ajax(putOptions)
    .done(successHandler)
    .fail(generalErrorHandler);
};

function deleteProduct () {
  const id = $('#getId').val();
  const deleteOptions = {
    type:        'DELETE',
    url:         'http://localhost:3000/admin_profile/catalog/' + id,
    contentType: 'application/json; charset=UTF-8'
  };
  $.ajax(deleteOptions)
    .done(successHandler)
    .fail(generalErrorHandler);
};


$(document).ready( () => {
  $('#getProducts').click(() => {
    getProduct();
  });
  $('#postProducts').click(() => {
    postProduct();
  });
  $('#putProducts').click(() => {
    putProducts();
  });
  $('#deleteProducts').click(() => {
    deleteProduct();
  });
  $('#getUsers').click(() => {
    getUsers();
  });

  $('#output').on('click', 'button.make-admin', function makeAdmin (event) {
    event.preventDefault();
    console.log($(this).data('user'));
    $.ajax({
      type:    'PUT',
      data:    {'username': $(this).data('user')},
      url:     '/set_admin',
      success: () =>  {
        getUsers();
      },
      error: (err) => {
        console.log(err + 'err');
      }
    });
  });

});
