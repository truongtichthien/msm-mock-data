/** @type {import('next').NextConfig} */

const nextConfig = {
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' }, // 'http://local.iskra.world:3000'
          { key: 'Access-Control-Allow-Methods', value: 'GET, DELETE, PATCH, POST, PUT, OPTIONS' },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Iskra-App-Id', // add cusomt X- Headers also
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
