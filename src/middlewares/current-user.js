const userRepository = require('../repositories/user.repository');

const currentUser = async (req, res, next) => {
  try {
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

    // FIX: Pag teacher1 / user1 yung nilagay, gamitin yung unang TEACHER sa DB
    // Para hindi ka na ma-401 habang nagte-test
    let user = await userRepository.findBySchoolId(schoolId);

    if (!user) {
      const fallback = {
        'teacher1': 1,
        'teacher': 1,
        'user1': 1,
        'host': 1,
        'user2': 2,
        'student1': 2,
      };
      const fallbackId = fallback[schoolId.toLowerCase()];
      if (fallbackId) {
        // Kunin yung user by id, hindi by school_id
        user = await userRepository.findById?.(fallbackId);
        // Kung walang findById, gawa tayo ng fake user para sa test
        if (!user) {
          user = {
            id: fallbackId,
            user_id: fallbackId,
            school_id: schoolId,
            role: fallbackId === 1 ? 'TEACHER' : 'STUDENT',
            username: schoolId,
          };
        }
      }
    }

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