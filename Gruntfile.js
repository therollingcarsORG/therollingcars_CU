module.exports = function(grunt){

	grunt.registerTask('out', function ()
	{
		console.log("\nWE are Grunting!!\n");
	});

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		// configure nodemon
	    nodemon: {
	      dev: {
	        script: 'server.js'
	      }
	    },

    	// JS TASKS -------------------------------------------------------------------------------

	    // check all js files for errors
    	jshint: {
      		all: ['public/src/js/**/*.js'],
				  options: {
            jshintrc: '.jshintrc'
    			}
    	},

		uglify: {
			options: {
				banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
			},
			build: {
				files: {
					'public/dist/js/app.min.js': ['public/src/js/**/*.js', 'public/src/js/*.js']
				}
			}
		},

		//concat: {
		//	distJS: {
		//	  src: ['public/src/js/jsSrc1.js', 'public/src/js/jsSrc2.js'],
		//	  dest: 'public/build/js/comboJS.js'
		//	},
		//	distCSS:
		//	{
		//	  src:['public/src/css/cssSrc1.css','public/src/css/cssSrc2.css'],
		//	  dest: 'public/build/css/comboCSS.css'
		//	}
		//},

		// CSS TASKS ------------------------------------------------------------------------------

		less: {
			build: {
		    	files: {
		      		'public/dist/css/style.css': 'public/src/css/style.less'
		    	}
		  	}
		},

		cssmin: {
			build: {
				files: {
					'public/dist/css/style.min.css': 'public/dist/css/style.css'
				}
			}
		},

		// OTHER TASKS ----------------------------------------------------------------------------

		// watch css and js files and process the above tasks
		watch: {
			css: {
				files: ['public/src/css/**/*.less'],
				tasks: ['less', 'cssmin']
			},
			js: {
				files: ['public/src/js/**/*.js'],
				tasks: ['jshint', 'uglify']
			}
		},

		// watch our node server for changes
		nodemon: {
			dev: {
				script: 'server.js'
			}
		},

		// run watch and nodemon at the same time
		concurrent: {
			options: {
				logConcurrentOutput: true
			},
			tasks: ['nodemon', 'watch']
		},

		// UNIT TESTING ----------------------------------------------------------------------------

		karma: {  
			unit: {
				options: {
					frameworks: ['jasmine'],
					singleRun: true,
					browsers: ['PhantomJS'],
					files: [
					'node_modules/angular/angular.js',
					'node_modules/angular-mocks/angular-mocks.js',
					'public/src/js/**/*.js',
					'test/client/**/*.js'
					]
				}
			}
		},

		mochaTest: {
			all: {
				options: {
					reporter: 'list'
				},
				src: ['test/server/*.test.js']
			}
		}



	});

	// load
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-nodemon');
	grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('grunt-mocha-test');


	// register when grunt is run
	grunt.registerTask('build', ['less', 'cssmin', 'jshint', 'uglify']);
	grunt.registerTask('test-client', ['jshint', 'karma']);
  	grunt.registerTask('default', ['less', 'cssmin', 'jshint', 'uglify', 'concurrent']);
  	grunt.registerTask('test-server', ['mochaTest']);
  	grunt.registerTask('test', ['jshint', 'karma', 'mochaTest']);



};

