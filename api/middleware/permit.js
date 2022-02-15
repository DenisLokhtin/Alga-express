const permit = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).send({error: 'Пользователь не опознан'});
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).send({error: 'Доступ запрещен'});
    }

    next();
  };
};

module.exports = permit;