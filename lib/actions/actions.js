import Goal from '../models/goal';
import User from '../models/user';

const actions = {};

actions.goals = {};
actions.goals.list = function* list() {
  const all = yield Goal.find({}).sort('-date').exec();
  return all;
};

actions.goals.add = function* add(body) {
  const newGoal = new Goal(body);
  yield newGoal.save();
  return newGoal;
};

actions.goals.remove = function* remove(id) {
  const goal = yield actions.goals.findOneById(id);
  return yield goal.remove();
};

actions.goals.findOneById = function* findOneById(id) {
  const result = yield Goal.findOne({ _id: id }).exec();
  return result;
};

actions.users = {};
actions.users.add = function* add(body) {
  const newUser = new User(body);
  yield newUser.save();
  return newUser;
};

actions.users.cancel = function* cancel(id) {
  const user = yield actions.users.findOneById(id);
  return yield user.remove();
};

actions.users.findOneById = function* findOneById(id) {
  const result = yield User.findOne({ _id: id }).exec();
  return result;
};

export default actions;
