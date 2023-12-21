const isNull = (entity) => {
  if (!entity || entity.length === 0) {
    return true;
  }
  return false;
};

const getPagination = (page, size) => {
  const limit = size ? +size : 10;
  const offset = page ? page * limit : 0;
  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: items } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);
  return {
    totalItems,
    totalPages,
    currentPage,
    items:
      Array.isArray(items) && items.length > 0 ? items : 'No data available'
  };
};

module.exports = {
  isNull,
  getPagination,
  getPagingData
};
