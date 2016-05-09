import models from '../models/models';

const User = models.user;
const users = {};

users.list = function* list() {
  const all = yield User.find({}).sort('-date').exec();
  return all;
};

users.add = function* add(body) {
  const newUser = new User(body);
  yield newUser.save();
  return newUser;
};

users.cancel = function* cancel(id) {
  const user = yield users.findOneById(id);
  return yield user.remove();
};

users.findOneById = function* findOneById(id) {
  const result = yield User.findOne({ _id: id }).exec();
  return result;
};

users.findOneByEmail = function* findOneByEmail(email) {
  const result = yield User.findOne({ email }).exec();
  return result;
};

export default users;
