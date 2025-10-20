'use strict';

const express = require('express');
const uploadsController = require('../controllers/uploads');
const helpers = require('./helpers');
const apiTopics = require('../api/topics');
module.exports = function (app, middleware, controllers) {
  const middlewares = [middleware.autoLocale, middleware.authenticateRequest];
  const router = express.Router();
  app.use('/api', router);
  router.get('/config', [...middlewares, middleware.applyCSRF], helpers.tryRoute(controllers.api.getConfig));
  router.get('/self', [...middlewares], helpers.tryRoute(controllers.user.getCurrentUser));
  router.get('/user/uid/:uid', [...middlewares, middleware.canViewUsers], helpers.tryRoute(controllers.user.getUserByUID));
  router.get('/user/username/:username', [...middlewares, middleware.canViewUsers], helpers.tryRoute(controllers.user.getUserByUsername));
  router.get('/user/email/:email', [...middlewares, middleware.canViewUsers], helpers.tryRoute(controllers.user.getUserByEmail));
  router.get('/categories/:cid/moderators', [...middlewares], helpers.tryRoute(controllers.api.getModerators));
  router.get('/recent/posts/:term?', [...middlewares], helpers.tryRoute(controllers.posts.getRecentPosts));
  router.get('/unread/total', [...middlewares, middleware.ensureLoggedIn], helpers.tryRoute(controllers.unread.unreadTotal));
  router.get('/topic/teaser/:topic_id', [...middlewares], helpers.tryRoute(controllers.topics.teaser));
  router.get('/topic/pagination/:topic_id', [...middlewares], helpers.tryRoute(controllers.topics.pagination));
  router.put('/topics/:tid/resolve', [...middlewares, middleware.ensureLoggedIn], helpers.tryRoute(async (req, res) => {
    console.log('In api.js before api result');
    const result = await apiTopics.resolve({
      uid: req.uid
    }, {
      tid: req.params.tid
    });
    console.log('In api.js after api result');
    console.log(result);
    res.json(result);
  }));
  router.delete('/topics/:tid/resolve', [...middlewares, middleware.ensureLoggedIn], helpers.tryRoute(async (req, res) => {
    const result = await apiTopics.unresolve({
      uid: req.uid
    }, {
      tid: req.params.tid
    });
    res.json(result);
  }));
  const multipart = require('connect-multiparty');
  const multipartMiddleware = multipart();
  const postMiddlewares = [middleware.maintenanceMode, multipartMiddleware, middleware.validateFiles, middleware.uploads.ratelimit, middleware.applyCSRF];
  router.post('/post/upload', postMiddlewares, helpers.tryRoute(uploadsController.uploadPost));
  router.post('/user/:userslug/uploadpicture', [...middlewares, ...postMiddlewares, middleware.exposeUid, middleware.ensureLoggedIn, middleware.canViewUsers, middleware.checkAccountPermissions], helpers.tryRoute(controllers.accounts.edit.uploadPicture));
};