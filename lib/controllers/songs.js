import router from 'koa-router';
import request from 'request-promise';
import render from '../util/render.js';
import actions from '../actions/actions';

const _view = {
  /**
   * View songs
   */
  list: function *list() {
    const songs = yield actions.songs.list();
    this.body = yield render('songs/list', {
      title: 'Songs',
      songs,
    });
  },

  /**
   * View song
   */
  show: function *show() {
    const id = this.params.id;
    const song = yield actions.songs.findOneById(id);
    this.body = yield render('songs/view', {
      title: 'Song',
      song,
    });
  },

  /**
   * Add song
   */
  add: function *add() {
    this.body = yield render('songs/add', {
      title: 'Add Song',
    });
  },
};

const _get = {
  /**
   * Browse Spotify API for tracks by query.
   */
  search: function *search() {
    const options = {
      url: 'https://api.spotify.com/v1/search',
      headers: {
        'User-Agent': 'request',
      },
      qs: {
        type: this.request.query.type || 'track',
        q: this.request.query.q || '',
        limit: this.request.query.limit || 15,
      },
    };

    const response = yield request(options);
    const tracks = JSON.parse(response).tracks.items;

    this.body = tracks;
  },
};

const _post = {
  /**
   * Add song
   */
  add: function *add() {
    const newSong = yield actions.songs.add(this.request.body);
    this.redirect(`/songs/${newSong._id}`);
  },

  /**
   * Cancel song
   */
  cancel: function *cancel() {
    yield actions.songs.cancel(this.params.id);
    this.redirect('/');
  },
};

const songs = router();

songs.get('/songs', _view.list);
songs.get('/songs/add', _view.add);
songs.get('/songs/:id', _view.show);

songs.get('/songs/search', _get.search);

songs.post('/songs/add', _post.add);
songs.post('/songs/:id', _post.cancel);

export default songs;
