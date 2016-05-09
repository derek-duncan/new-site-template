import router from 'koa-router';
import render from '../util/render.js';
import actions from '../actions/actions';

/**
 * View playlist
 */
const view_playlist = function *view_playlist() {
  const id = this.params.id;
  const playlist = yield actions.playlists.findOneById(id);
  this.body = yield render('playlists/view', {
    title: 'Playlists',
    playlist,
  });
}

/**
 * Add playlist
 */
const view_add_playlist = function *view_add_playlist() {
  this.body = yield render('playlists/add', {
    title: 'Signup',
  });
}

/**
 * Add playlist
 */
const form_add_playlist = function *form_add_playlist() {
  const newPlaylist = yield actions.playlists.add(this.request.body);
  this.redirect(`/playlists/${newPlaylist._id}`);
}

/**
 * Cancel playlist
 */
const form_cancel_playlist = function *form_cancel_playlist() {
  yield actions.playlists.cancel(this.params.id);
  this.redirect('/');
}

const playlists = router();

playlists.get('/playlists/add', view_add_playlist);
playlists.get('/playlists/:id', view_playlist);

playlists.post('/playlists/add', form_add_playlist);
playlists.post('/playlists/:id', form_cancel_playlist);

export default playlists;
