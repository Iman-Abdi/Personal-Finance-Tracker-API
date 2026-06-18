const notFound =
  (
    req,
    res,
    next
  ) => {
    res.status(404);

    throw new Error(
      `Route not found - ${req.originalUrl}`
    );
  };

export default notFound;