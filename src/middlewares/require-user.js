module.exports = (req, res, next) => {
  const demoUser = req.get('X-Demo-User') || req.get('x-demo-user');
  
  // EMERGENCY BYPASS - Para matapos na Week 11 mo
  if (demoUser) {
    req.user = {
      id: 1,
      user_id: demoUser,
      school_id: demoUser,
      role: demoUser === 'host1' ? 'host' : 'player',
      username: demoUser
    };
    return next();
  }

  if (!req.user) {
    return res.status(401).json({
      code: 'AUTH_REQUIRED',
      message: 'Say who you are first: send the X-Demo-User header.'
    });
  }
  next();
};