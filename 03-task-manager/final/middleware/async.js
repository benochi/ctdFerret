const asyncWrapper = (fn) => {
  return async (req, res, next) => {
    try {
      console.log(req.method, req.body, req.params, req.query);
      await fn(req, res, next)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = asyncWrapper
