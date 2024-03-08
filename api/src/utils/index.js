const passwordValidator = require("password-validator");
const AWS = require("aws-sdk");

function validatePassword(password) {
  const schema = new passwordValidator();
  schema
    .is()
    .min(6) // Minimum length 6
    .is()
    .max(100) // Maximum length 100
    .has()
    .uppercase(1) // Minimum 1 uppercase
    .has()
    .lowercase(1)
    .has()
    .symbols(1)
    .has()
    .digits(1);

  return schema.validate(password);
}

module.exports = {
  validatePassword,
};
