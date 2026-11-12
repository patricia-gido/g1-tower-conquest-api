const USERS = {
  user1: { id: 1, user_id: 'user1', role: 'player' },
  user2: { id: 2, user_id: 'user2', role: 'player' },
  user3: { id: 3, user_id: 'user3', role: 'player' },
  host1: { id: 4, user_id: 'host1', role: 'host' },
  host2: { id: 5, user_id: 'host2', role: 'host' },
};

module.exports = (...allowedRoles) => {
  return (req, res, next) => {
    const demoUser = req.get('X-Demo-User') || req.get('x-demo-user');

    if (!demoUser) {
      return res.status(401).json({
        code: 'AUTH_REQUIRED',
        message: 'Say who you are first: send the X-Demo-User header.'
      });
    }

    const user = USERS[demoUser];
    if (!user) {
      return res.status(401).json({
        code: 'AUTH_REQUIRED',
        message: 'Unknown demo user.'
      });
    }

    req.user = user;

    if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
      return res.status(403).json({
        code: 'FORBIDDEN',
        message: 'This account may not do this.'
      });
    }

    next();
  };
};