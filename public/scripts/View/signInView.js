var newUser = {};

newUser.initnewUserPage = function () {
  $('#new-user-form').on('submit', newUser.create);
};

newUser.create = function() {
  var input_ids = $('#new-user-form input').map(function() {
      return this.id;
  });
  var currentUser = new User();
  input_ids.forEach(function(id){
    currentUser[id] = $('#' + id).val()
  })
  currentUser.insertNewUser();
};

newUser.initnewUserPage();
