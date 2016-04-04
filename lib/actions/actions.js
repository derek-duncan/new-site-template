import Goal from '../models/goal';

const actions = {

  list: function* list() {
    const all = yield Goal.find({}).exec();
    return all;
  },

  add: function* add(body) {
    const newGoal = new Goal(body);
    yield newGoal.save();
    return newGoal;
  },

};
export default actions;
