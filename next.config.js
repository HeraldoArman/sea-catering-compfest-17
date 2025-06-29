/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['thebigmansworld.com', 'healthclub.methodgym.com', 
        'www.tasteofhome.com', "randomuser.me", "cdn-abeco.nitrocdn.com", "blog.cdphp.com"
      ],
    },
    // eslint: {
    //   // Warning: This allows production builds to successfully complete even if
    //   // your project has ESLint errors.
    //   ignoreDuringBuilds: true,
    // },
  };

module.exports = nextConfig;
