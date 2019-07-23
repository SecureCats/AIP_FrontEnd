module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "//cdn.aip.fates.felinae98.cn/static/login/" : "/",
  outputDir: process.env.NODE_ENV === "production" ? "dist/login" : "dist"
};
