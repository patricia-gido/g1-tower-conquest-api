function constraintOf(error) {
  if (!error) return null;
  if (error.name === 'SequelizeUniqueConstraintError' && error.parent) {
    return error.parent.constraint || null;
  }
  if (error.parent && error.parent.constraint) {
    return error.parent.constraint;
  }
  if (error.constraint) return error.constraint;
  return null;
}

module.exports = { constraintOf };