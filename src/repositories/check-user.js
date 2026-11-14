const { User } = require('../models');

(async () => {
  const users = await User.findAll();
  users.forEach(u => {
    console.log(`user_id: ${u.user_id} | id: ${u.id} | school_id: ${u.school_id} | username: ${u.username} | role: ${u.role}`);
  });
  process.exit(0);
})();