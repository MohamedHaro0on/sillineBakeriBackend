const pagination = (req, res, next) => {
  const size = parseInt(req.query.size) || 10;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(size);
  const skip = (parseInt(page) - 1) * limit;
  req.pagination = {
    limit,
    skip,
  };
  next();
};

export default pagination;
