function User(opts) {
  for (key in opts) {
    this[key] = opts;
  }
}


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

//LOOK UP FOR LOCATION OR INTERESTS?
User.allInCategory = function (category) {

};
