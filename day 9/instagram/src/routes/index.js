const authRoutes = require('./auth');
const PostRoutes = require('./post');
const commentRoutes = require('./comment');
const postlikeRoutes = require('./postlike');

const routers = {
 authRoutes,
 PostRoutes,
 commentRoutes,
 postlikeRoutes
};

module.exports = routers;
