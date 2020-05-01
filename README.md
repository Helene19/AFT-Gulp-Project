# AFT-Gulp-Project 

##Gulp

This project includes some basic stuff with gulp.

It uses NPM modules and gulp.

In this project you should install some gulp plugins.

**Plugins**
    
 * gulp-less
 * gulp-cssmin
 * gulp-rename
 * gulp-concat
 * gulp-uglify
 * gulp-browsersync
 * gulp-image
 * gulp-htmlmin
 * gulp-minify-inline
 * gulp-html
 
 #First Steps
 
 At the beginning, you have to install npm with this command:
  
    npm install

##Using Gulp

When you write

    gulp
    
into the terminal, then the default task is going to run. This includes
the following gulp tasks:

    gulp less
    gulp cssmin
    gulp concat
    gulp uglify
    gulp image
    gulp minify-inline
    gulp html-min
    
Here you can see what each individual task does:

https://gulpjs.com/plugins

There is one gulp task you have to run yourself. This is the task:

    gulp html
    
This task checks whether you have any bugs in the HTML. It works
like a validator.

When you run "gulp serve", this gulp tasks are going to run

    gulp                --> the default task from above, so all tasks,
                        --> which the default includes
    gulp browser-sync   --> can be used for testing mobile and on desktop
    gulp watch          --> starts file watchers for less,
                        --> js and html files