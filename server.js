import express from "express";
import path from "path";
const dirname = path.resolve();
const server = express();

//webpack 미들웨어 사용
import webpackDevMiddleware from "webpack-dev-middleware";
import webpack from "webpack";
import webpackConfig from "./webpack.config.js";
const compiler = webpack(webpackConfig);

server.use(
    webpackDevMiddleware(compiler, {
        publicPath: webpackConfig.output.publicPath,
    })
);

//포트번호 3000
server.set("port", 3000);

//bundle된 index.html '/' 주소로 요청
server.get("/", (req, res) => {
    res.sendFile(path.resolve(dirname, "public/index.html"));
});

server.listen(server.get("port"), () => {
    console.log("http://localhost:" + server.get("port"));
});
