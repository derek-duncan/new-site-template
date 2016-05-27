import models from '../models/models';

const Genre = models.playlist;
const genres = {};

genres.list = function* list() {
  const all = yield Genre.find({}).sort('-date').exec();
  return all;
};

genres.add = function* add(body) {
  const newGenre = new Genre(body);
  yield newGenre.save();
  return newGenre;
};

genres.remove = function* remove(id) {
  const playlist = yield genres.findOneById(id);
  return yield playlist.remove();
};

genres.findOneById = function* findOneById(id) {
  const result = yield Genre.findOne({ _id: id }).exec();
  return result;
};

genres.findOneByEmail = function* findOneByEmail(email) {
  const result = yield Genre.findOne({ email }).exec();
  return result;
};

export default genres;
