exports.private = async (req, res, next) => {
  res.status(201).json({
    succcess: true,
    message: "You are accessing this private route",
  });
};
