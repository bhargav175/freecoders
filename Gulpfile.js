var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var livereload = require('gulp-livereload');


gulp.task('serve',[],function(){
	livereload.listen();
	nodemon({
		script:'server/app/index.js',
		stdout:true,
		exec : 'babel-node --presets es2015,stage-3 --'
		}).on('readable',function(){
			console.log('watching');
			this.stdout.on('data',function(){
					console.log('data');
					console.log(chunk);
					console.log(/^listening/.test(chunk));

					if (/listening/.test(chunk)) {
						console.log('reloading');
						livereload.reload();
					}
					process.stdout.write(chunk)
				})
			});
});

