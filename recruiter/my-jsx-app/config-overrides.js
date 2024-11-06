const webpack = require('webpack');

module.exports = function override(config) {
    const fallback = config.resolve.fallback || {};
    Object.assign(fallback, {
        'process.browser': 'true',
        crypto: require.resolve("crypto-browserify"),
        http: require.resolve("stream-http"),
        url: require.resolve("url/"),
        stream: require.resolve("stream-browserify"),
        zlib: require.resolve("browserify-zlib"),
        os: require.resolve("os-browserify/browser"),
        path: require.resolve("path-browserify"),
        buffer: require.resolve("buffer/"),
        assert: require.resolve("assert/"),
        process: require.resolve("process/browser"),
        querystring: require.resolve("querystring-es3"),
        child_process:false,
        timers:false,
        snappy: false,
        fs: false,
        net: false,
        tls: false,
        dns: false,
    });

    config.resolve.fallback = fallback;

    // Add plugins here instead of in the fallback
    config.plugins = (config.plugins || []).concat([
        new webpack.ProvidePlugin({
            process: 'process/browser',
            Buffer: ['buffer', 'Buffer'] // Provide Buffer globally if needed
        })
    ]);

    return config;
};
