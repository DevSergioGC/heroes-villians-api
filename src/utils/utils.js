const isNull = (entity) => {
  if (!entity || entity.length === 0) {
    return true;
  }
  return false;
};

module.exports = {
  isNull
};
