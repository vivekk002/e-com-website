const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: "sandbox",
  client_id:
    "AccsYA2zbOowchZmHKjrBBYY2qDwZieQmxyYT9uAKkT9bYllwB0cqSurNK5ucucg5OMFbw9a2YkpFg57",
  client_secret:
    "ECv9KbY0K3i9798GaJmInJbc6nI0OOFrxbrnkdS8Isvx2SjcGgwrlqfxGZANSLCvJ2XZSFe8e7F_srj3",
});

module.exports = paypal;
