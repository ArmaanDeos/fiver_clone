const generateAccessToken = (statusCode, user, res) => {
  const accessToken = user.getAccessToken();

  // cookies option
  const options = {
    httpOnly: true,
    expiresIn: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
    ),
  };

  res.status(statusCode).cookie("token", accessToken, options).json({
    success: true,
    user,
    accessToken,
    message: "Login Successful",
  });
};

export { generateAccessToken };
