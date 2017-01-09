function User(opts) {
  Object.keys(opts).forEach(function (e, index, keys) {
    this[e] = opts[e];
  }, this);
}

User.allUsers = [];

User.prototype.insertNewUser = function () {
  //write this user into database
};

//FUNCTIONS THAT MAY BE USEFUL
User.prototype.deleteUser = function () {
  //delete this user from database
};

User.prototype.updateUser = function () {
  //update this user from database
};

User.loadAllUsers = function (key) {
  var retreivedData = JSON.parse(localStorage.getItem(key)); //in place of our ajax call
  User.allUsers = retreivedData.sort(function(a, b) { return a.name - b.name; }).map(function (ele) {
    return new User(ele);
  });
};

//LOOK UP FOR LOCATION OR INTERESTS?
User.allInCategory = function (category) {
  return User.allUsers.map(function (currentUser) {
    return currentUser[category];
  }).filter(function (element, index, array) {
    return array.indexOf(element) === index;
  });
};
