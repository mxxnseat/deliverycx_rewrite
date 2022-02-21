module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '2b2af3aa9f23fa7c3d461219c89387b3'),
  },
});
