const nextConfig = {
    basePath: '',
    reactStrictMode: true,
    swcMinify: true,
    eslint: {
        ignoreDuringBuilds: false,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '3000',
                pathname: '/api/images/**',
            },
        ],
    },
    webpack(config) {
        config.resolve.fallback = { fs: false };

        return config;
    },
    /*
        pageExtensions: ['mdx', 'md', 'jsx', 'js', 'tsx', 'ts', 'mjs'],
        webpack: (config, { webpack }) => {
            config.module.rules.push({
                test: /\.mjs$/,
                include: /node_modules/,
                type: 'javascript/auto',
            });

            // Ignore 'fs' and 'child_process' modules in client-side builds
            if (!config.plugins) {
                config.plugins = [];
            }

            config.plugins.push(
                new webpack.IgnorePlugin({
                    resourceRegExp: /^fs$|^(child_|worker_)?process$/,
                    contextRegExp: /\/config$/,
                })
            );

            return config;
        },
    */
};

module.exports = nextConfig;
