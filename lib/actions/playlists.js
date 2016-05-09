import models from '../models/models';

const Playlist = models.playlist;
const playlists = {};

playlists.list = function* list() {
  const all = yield Playlist.find({}).sort('-date').exec();
  return all;
};

playlists.add = function* add(body) {
  const newPlaylist = new Playlist(body);
  yield newPlaylist.save();
  return newPlaylist;
};

playlists.remove = function* remove(id) {
  const playlist = yield playlists.findOneById(id);
  return yield playlist.remove();
};

playlists.findOneById = function* findOneById(id) {
  const result = yield Playlist.findOne({ _id: id }).exec();
  return result;
};

playlists.findOneByEmail = function* findOneByEmail(email) {
  const result = yield Playlist.findOne({ email }).exec();
  return result;
};

export default playlists;
