var newUser = {};

newUser.initnewUserPage = function () {
  $('#new-user-form').on('submit', newUser.create);
};

newUser.create = function() {
  var input_ids = $('#new-user-form input').map(function() {
      return this.id;
  }).get();
  var CurrentUser = new User();
  input_ids.forEach(function(id){
    CurrentUser[id] = $('#' + id).val()
  })
  console.log('New user', CurrentUser);
  CurrentUser.insertNewUser();
};

newUser.initnewUserPage();
