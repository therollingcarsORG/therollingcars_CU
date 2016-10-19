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
      		all: ['public/src/js/**/*.js'] 
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


	// register when grunt is run
	grunt.registerTask('build', ['less', 'cssmin', 'jshint', 'uglify']);

  	grunt.registerTask('default', ['less', 'cssmin', 'jshint', 'uglify', 'concurrent']);

};

