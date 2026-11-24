const userRepository = require('../repositories/user.repository');

const currentUser = async (req, res, next) => {
  try {
    // FIX: Basahin both HUB_API_KEY at HUB_KEY
    const hubKey = process.env.HUB_API_KEY || process.env.HUB_KEY || 'dev-hub-key';
    const requestHubKey = req.get('X-Hub-Key') || req.get('x-hub-key');

    if (requestHubKey && requestHubKey !== hubKey) {
      return res.status(401).json({ message: 'Invalid Hub Key' });
    }

    const schoolId = req.get('X-Demo-User') || req.get('x-demo-user');
    
    if (!schoolId) {
      req.user = null;
      return next();
    }

    const user = await userRepository.findBySchoolId(schoolId);
    
    if (user) {
      req.user = {
        id: user.id,
        user_id: user.user_id,
        school_id: user.school_id || user.user_id,
        role: user.role,
        username: user.username
      };
    } else {
      req.user = null;
    }

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = currentUser;