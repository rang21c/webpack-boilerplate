import path from "path";
const dirname = path.resolve();
//HTML 플러그인
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

const webpackConfig = {
    mode: "development",
    devtool: "source-map", //크롬에서 디버깅 가능하도록 원본코드같이 bundle
    entry: "./src/index.js", //진입점
    output: {
        path: path.resolve(dirname, "public"), // bundle만들어질 장소
        filename: "index.bundle.js", // bundle 될 파일 이름
        publicPath: "http://localhost:3000/public", //웹팩 미들웨어 장소
    },
    module: {
        rules: [
            {
                test: /\.js$/, //.js 파일 templating
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                    },
                },
            },
            {
                test: /\.(sa|sc|c)ss$/, //scss,sass,css templating
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "src/index.html", //html  webpack플러그인을 통해 html 파일도 함께 bundle
        }),
        new MiniCssExtractPlugin({
            // style 태그 대신 css 파일도 함께 bundle
            filename: "style.css",
            chunkFilename: "style.css",
        }),
    ],
};

export default webpackConfig;
