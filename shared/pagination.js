const paginationMiddleware = () => {
  return (req, res, next) => {
    console.log(req.params.query);
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.size) || 10;

    const skip = (page - 1) * limit;
    // Attach pagination data to the request object
    req.pagination = {
      page,
      limit,
      skip,
    };
    next(); // Call the next middleware
  };
};
module.exports = paginationMiddleware;