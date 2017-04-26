var gulp 		= require('gulp'),
	sass 		= require('gulp-sass'),
	minifyCSS	= require('gulp-clean-css'),
	prefix 		= require('gulp-rename');


	gulp.task("minifyCSS", function () {
		
		gulp.src("public/stylesheets/*.min.css")
			.pipe(minifyCSS())
			.pipe(gulp.dest("public/stylesheets/"));

	});

	gulp.task("prefix", function(){

		gulp.src("public/stylesheets/style.css")
			.pipe(prefix({suffix: '.min'}))
			.pipe(gulp.dest("public/stylesheets/"));

	});

	gulp.task("sass", function () {
		
		gulp.src("public/stylesheets/sass/style.sass")
		   .pipe(sass().on('error', sass.logError))
		   .pipe(gulp.dest("public/stylesheets/"));

	});


	gulp.task("default", ['sass', 'prefix', 'minifyCSS']);