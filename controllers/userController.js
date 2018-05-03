const User = require('../models/user');
const bcrypt = require('bcrypt');

exports.users_list = () => {
  return new Promise(function(resolve, reject) {

    User.find(function(err, users) {
      if(err) {
        const e = new Error('DatabaseError');
        reject(e);
      }
      resolve(users);
    });
  });
};

exports.users_create = (data) => {
  return new Promise(function(resolve, reject) {

    let user = new User();
    user.name = data.name;
    user.email = data.email;
    user.password = bcrypt.hashSync(data.password, 10);
    user.imageURL = data.imageURL;

    user.save(function(err) {
      if (err) {
        const e = new Error('UserNotCreatedError');
        reject(e);
      }

      resolve({message: user.name + ' created!'});
    });
  });
};

exports.user_get = (id) => {
  return new Promise(function(resolve, reject) {

    User.findById(id, function(err, user) {

      if(err) {
        const e = new Error('UserNotFoundError');
        reject(err);
      }

      resolve(user);
    });
  });
};

// exports.user_update = (id, data) => {
//   return new Promise(function(resolve, reject) {
//     User.findById(id, function(err, user) {
//       if(err) {
//         res.send(err);
//       }
//
//       user.name = req.body.name;
//
//       user.save(function(err) {
//         if(err) {
//           res.send(err);
//         }
//
//         res.json({ message: 'User updated!'});
//       });
//     });
//   });
// };

exports.user_delete = (id) => {
  return new Promise(function(resolve, reject) {

    User.remove({
      _id: id
    }, function(err, user) {
      if(err) {
        const e = new Error('UserNotDeletedError');
        reject(err);
      }

      resolve({message: 'Successfully deleted' });
    });
  });
};
