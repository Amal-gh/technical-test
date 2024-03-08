export function getMonths(count = 20) {
  const arr = [];
  var d = new Date();
  for (let i = 0; i < count; i++) {
    arr.push(new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() - i, 1)));
  }
  return arr;
}

export function formatDate(date) {
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

const passwordValidator = require("password-validator");

export function validatePassword(password) {
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

  console.log('is valid', schema.validate(password));
  const checkPassword = schema.validate(password);

  return checkPassword === true ? {valid: true} :
      {valid: false, error: "Password must contain a minimum of 8 characters with at least one uppercase " +
            "one lowercase one special character and one number"}
}


