function constraintOf(error) {
  if (!error) return null;
  if (error.original && error.original.constraint) return error.original.constraint;
  if (error.parent && error.parent.constraint) return error.parent.constraint;
  if (error.name === 'SequelizeUniqueConstraintError' && error.errors && error.errors[0]) {
    return error.errors[0].path;
  }
  return null;
}
module.exports = { constraintOf };