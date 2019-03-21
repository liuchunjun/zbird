let gulp = require("gulp")
let sass = require("gulp-sass");

gulp.task("all",async()=>{
    gulp.src(["./**/*","!node_modules/**/*"]).pipe(gulp.dest("D:\\phpStudy\\WWW\\zbird"))
});

gulp.task("watchall",async()=>{
    gulp.watch("./**/*",gulp.series("all"));
    gulp.watch("./css/*.scss",gulp.series("sass"));
})
gulp.task("sass",async()=>{
    gulp.src("./css/*.scss").pipe(sass()).pipe(gulp.dest("./css"));
});
