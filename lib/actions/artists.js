import models from '../models/models';

const Artist = models.playlist;
const artists = {};

artists.list = function* list() {
  const all = yield Artist.find({}).sort('-date').exec();
  return all;
};

artists.add = function* add(body) {
  const newArtist = new Artist(body);
  yield newArtist.save();
  return newArtist;
};

artists.remove = function* remove(id) {
  const playlist = yield artists.findOneById(id);
  return yield playlist.remove();
};

artists.findOneById = function* findOneById(id) {
  const result = yield Artist.findOne({ _id: id }).exec();
  return result;
};

artists.findOneByEmail = function* findOneByEmail(email) {
  const result = yield Artist.findOne({ email }).exec();
  return result;
};

export default artists;
