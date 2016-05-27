import models from '../models/models';

const Song = models.song;
const songs = {};

songs.list = function* list() {
  const all = yield Song.find({}).sort('-date').exec();
  return all;
};

songs.add = function* add(body) {
  const newSong = new Song(body);
  yield newSong.save();
  return newSong;
};

songs.remove = function* remove(id) {
  const song = yield songs.findOneById(id);
  return yield song.remove();
};

songs.findOneById = function* findOneById(id) {
  const result = yield Song.findOne({ _id: id }).exec();
  return result;
};

songs.findOneByEmail = function* findOneByEmail(email) {
  const result = yield Song.findOne({ email }).exec();
  return result;
};

export default songs;
