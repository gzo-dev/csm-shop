const axios = require('axios');

const recaptchaMiddleware = async (req, res, next) => {
  const { recaptchaToken } = req.body;
    console.log(recaptchaToken    )
  if (!recaptchaToken) {
    return res.status(400).json({ error: 'reCAPTCHA token is missing' });
  }

  try {
    const secretKey = process.env.GOOGLE_RECAPTCHA_SECRET_KEY;
    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptchaToken}`
    );
    console.log(response.data)
    if (!response.data.success) {
      return res.status(400).json({ error: 'Invalid reCAPTCHA' });
    }

    next();
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = recaptchaMiddleware;
