const path = require("path");
const webpack = require("webpack");

module.exports = (env) => {
    return {
        entry: {
            qrgenerator: [
                "core-js/stable",
                "regenerator-runtime/runtime",
                "./assets/js/qrgeneratorIndex.js",
            ],
        },
        output: {
            filename: "[name].min.js",
            path: path.resolve(__dirname, "assets", "js", "dist"),
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    include: [/materialize/, /assets/],
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: ["@babel/preset-env"],
                        },
                    },
                },
                {
                    test: /\.css$/,
                    use: ["style-loader", "css-loader"],
                },
            ],
        },
        plugins: [
            new webpack.DefinePlugin({
                PUBLIC_KEY: JSON.stringify(env.PUBLIC_KEY),
                BASE_URL: JSON.stringify(env.BASE_URL),
                GIT_INFO: JSON.stringify(env.GIT_INFO),
            }),
            // fix "process is not defined" error:
            // (do "npm install process" before running the build)
            new webpack.ProvidePlugin({
                process: 'process/browser',
            }),
        ],
        resolve: {
            fallback: {
                path: require.resolve("path-browserify"),
                crypto: require.resolve("crypto-browserify"),
                stream: require.resolve("stream-browserify"),
                Buffer: require.resolve("buffer/"),
            },
        },
    };
};
