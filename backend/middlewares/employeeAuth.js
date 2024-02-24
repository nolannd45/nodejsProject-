const employeeAuth = (req, res, next) => {
  const auth = req.user.role;
  if (auth === "employee") {
    next();
  } else {
    res.sendStatus(401);
  }
};

export default employeeAuth;
