const gulp = require("gulp");
const less = require("gulp-less");

gulp.task("compileLess", (done) => {
  gulp
    .src("./public/themes/*.less")
    .pipe(less())
    .pipe(gulp.dest("./public/themes"));
  done();
});

// 通过watch方法实时监测所有less文件，如果发生更改，执行compileLess方法
gulp.task("watch", function () {
  gulp.watch("./public/themes/*.less", gulp.series("compileLess"));
});
