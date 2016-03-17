import List from '../models/list';

const actions = {

  list() {
    return function *list() {
      const all = yield List.find({}).exec();
      return all;
    };
  },

};
export default actions;
