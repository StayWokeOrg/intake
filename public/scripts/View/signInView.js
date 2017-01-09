var newUser = {};

newUser.initnewUserPage = function initnewUserPage() {
  $('#new-user-form').on('submit', newUser.create);
};

newUser.create = function create() {
  var inputIds = $('#new-user-form input').map(function() {
    return this.id;
  }).get();
  var CurrentUser = new User();
  inputIds.forEach(function(id) {
    CurrentUser[id] = $('#' + id).val();
  });
  console.log('New user', CurrentUser);
  CurrentUser.insertNewUser();
};

newUser.initnewUserPage();
