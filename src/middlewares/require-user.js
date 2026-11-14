const USERS = {
  user1: { id: 1, user_id: 'user1', role: 'PLAYER' },
  user2: { id: 2, user_id: 'user2', role: 'PLAYER' },
  user3: { id: 3, user_id: 'user3', role: 'PLAYER' },
  host1: { id: 4, user_id: 'host1', role: 'HOST' },
  host2: { id: 5, user_id: 'host2', role: 'HOST' },
};

module.exports = (...allowedRoles) => {
  return (req, res, next) => {
    const demoUser = req.get('X-Demo-User') || req.get('x-demo-user');

    if (!demoUser) {
      return res.status(401).json({ code: 'AUTH_REQUIRED', message: 'Say who you are first: send the X-Demo-User header.' });
    }

    const user = USERS[demoUser];

    if (!user) {
      return res.status(401).json({ code: 'AUTH_REQUIRED', message: 'Unknown demo user.' });
    }

    req.user = user;

    // FIX: case-insensitive para kahit 'host' o 'HOST' tanggapin
    const userRole = (user.role || '').toUpperCase();
    const normalizedAllowed = allowedRoles.map(r => String(r).toUpperCase());

    if (allowedRoles.length > 0 && !normalizedAllowed.includes(userRole)) {
      return res.status(403).json({ code: 'FORBIDDEN', message: 'This account may not do this.' });
    }

    next();
  };
};