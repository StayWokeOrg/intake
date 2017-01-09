function User(opts) {
  for (var key in opts) {
    this[key] = opts;
  }
}

User.prototype.insertNewUser = function insertNewUser() {
// write this user into database
};

// FUNCTIONS THAT MAY BE USEFUL
User.prototype.deleteUser = function deleteUser() {
// delete this user from database

};

User.prototype.updateUser = function updateUser() {
// update this user from database
};

// LOOK UP FOR LOCATION OR INTERESTS?
User.allInCategory = function allInCategory(category) {
};
