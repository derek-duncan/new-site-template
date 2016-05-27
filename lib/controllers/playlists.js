import router from 'koa-router';
import render from '../util/render.js';
import actions from '../actions/actions';

const _view = {
  /**
   * View playlists
   */
  list: function *list() {
    const playlists = yield actions.playlists.list();
    this.body = yield render('playlists/list', {
      title: 'Playlists',
      playlists,
    });
  },

  /**
   * View playlist
   */
  show: function *show() {
    const id = this.params.id;
    const playlist = yield actions.playlists.findOneById(id);
    this.body = yield render('playlists/view', {
      title: 'Playlist',
      playlist,
    });
  },

  /**
   * Add playlist
   */
  add: function *add() {
    this.body = yield render('playlists/add', {
      title: 'Signup',
    });
  },
};

const _post = {
  /**
   * Add playlist
   */
  add: function *add() {
    const newPlaylist = yield actions.playlists.add(this.request.body);
    this.redirect(`/playlists/${newPlaylist._id}`);
  },

  /**
   * Cancel playlist
   */
  cancel: function *cancel() {
    yield actions.playlists.cancel(this.params.id);
    this.redirect('/');
  },
};

const playlists = router();

playlists.get('/playlists', _view.list);
playlists.get('/playlists/add', _view.add);
playlists.get('/playlists/:id', _view.show);

playlists.post('/playlists/add', _post.add);
playlists.post('/playlists/:id', _post.cancel);

export default playlists;
