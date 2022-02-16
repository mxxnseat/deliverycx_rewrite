module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'f021e93dbf7c24631d9bd7a725d8b364'),
  },
});
