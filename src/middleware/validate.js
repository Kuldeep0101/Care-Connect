const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      errors: result.error.issues.map((issues) => ({
        path: issues.path,
        message: issues.message,
      })),
    });
  }
  next();
};

module.exports = validate;
