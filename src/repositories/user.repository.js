const { Op } = require('sequelize');
const { User } = require('../models');

class UserRepository {
  async findBySchoolId(schoolId) {
    // Hinahanap kahit user_id, school_id, o username para hindi na mag 401
    return await User.findOne({
      where: {
        [Op.or]: [
          { user_id: schoolId },
          { school_id: schoolId },
          { username: schoolId },
          { id: schoolId }
        ]
      }
    });
  }

  async findById(id) {
    return await User.findByPk(id);
  }
}

module.exports = new UserRepository();