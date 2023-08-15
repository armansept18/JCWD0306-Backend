const verify = (req, res, next) => {
 const key = req.headers['x-secret-key'];
 if (key !== process.env.secret) return res.status(500).send('not authorized');
 next();
};

module.exports = verify;
