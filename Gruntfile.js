/* global module:false */
module.exports = function(grunt) {
	var port = grunt.option('port') || 8000;
	var root = grunt.option('root') || '.';

	if (!Array.isArray(root)) root = [root];

	// Project configuration
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		meta: {
			banner:
				'/*!\n' +
				' * reveal.js <%= pkg.version %> (<%= grunt.template.today("yyyy-mm-dd, HH:MM") %>)\n' +
				' * http://revealjs.com\n' +
				' * MIT licensed\n' +
				' *\n' +
				' * Copyright (C) 2018 Hakim El Hattab, http://hakim.se\n' +
				' */'
		},

		qunit: {
			files: [ 'src/test/*.html' ]
		},

		uglify: {
			options: {
				banner: '<%= meta.banner %>\n',
				ie8: true
			},
			build: {
				src: 'src/js/reveal.js',
				dest: 'src/js/reveal.min.js'
			}
		},

		sass: {
			core: {
				src: 'src/css/reveal.scss',
				dest: 'src/css/reveal.css'
			},
			extras: {
				src: 'src/css/extras.scss',
				dest: 'src/css/extras.css'
			},
			themes: {
				expand: true,
				cwd: 'src/css/theme/source',
				src: ['*.sass', '*.scss'],
				dest: 'src/css/theme',
				ext: '.css'
			}
		},

		autoprefixer: {
			core: {
				src: 'src/css/reveal.css'
			}
		},

		cssmin: {
			options: {
				compatibility: 'ie9'
			},
			compress: {
				src: 'src/css/reveal.css',
				dest: 'src/css/reveal.min.css'
			}
		},

		jshint: {
			options: {
				curly: false,
				eqeqeq: true,
				immed: true,
				esnext: true,
				latedef: 'nofunc',
				newcap: true,
				noarg: true,
				sub: true,
				undef: true,
				eqnull: true,
				browser: true,
				expr: true,
				loopfunc: true,
				globals: {
					head: false,
					module: false,
					console: false,
					unescape: false,
					define: false,
					exports: false
				}
			},
			files: [ 'Gruntfile.js', 'src/js/reveal.js' ]
		},

		connect: {
			server: {
				options: {
					hostname: "localhost",
					port: port,
					base: root,
					livereload: true,
					open: false,
					useAvailablePort: true
				}
			}
		},

		zip: {
			bundle: {
				src: [
					'index.html',
					'src/css/**',
					'src/js/**',
					'src/lib/**',
					'images/**',
					'src/plugin/**',
					'slides/**.md',
					'slides/**.html',
				],
				dest: 'reveal-js-presentation.zip'
			}
		},

		watch: {
			js: {
				files: [ 'Gruntfile.js', 'src/js/reveal.js' ],
				tasks: 'js'
			},
			theme: {
				files: [
					'src/css/theme/source/*.sass',
					'src/css/theme/source/*.scss',
					'src/css/theme/template/*.sass',
					'src/css/theme/template/*.scss'
				],
				tasks: 'css-themes'
			},
			css: {
				files: [ 'src/css/reveal.scss',
			 					 'src/css/extras.scss'],
				tasks: 'css-core'
			},
			html: {
				files: [root.map(path => path + '/*.html'),
				        'slides/*.html'],
			},
			markdown: {
				files: root.map(path => path + 'slides/*.md')
			},
			options: {
				livereload: true,
			}
		},

		retire: {
			js: [ 'src/js/reveal.js', 'src/lib/js/*.js', 'src/plugin/**/*.js' ],
			node: [ '.' ]
		}

	});

	// Dependencies
	grunt.loadNpmTasks( 'grunt-contrib-connect' );
	grunt.loadNpmTasks( 'grunt-contrib-cssmin' );
	grunt.loadNpmTasks( 'grunt-contrib-jshint' );
	grunt.loadNpmTasks( 'grunt-contrib-qunit' );
	grunt.loadNpmTasks( 'grunt-contrib-uglify' );
	grunt.loadNpmTasks( 'grunt-contrib-watch' );
	grunt.loadNpmTasks( 'grunt-autoprefixer' );
	grunt.loadNpmTasks( 'grunt-retire' );
	grunt.loadNpmTasks( 'grunt-sass' );
	grunt.loadNpmTasks( 'grunt-zip' );

	// Default task
	grunt.registerTask( 'default', [ 'css', 'js' ] );

	// JS task
	grunt.registerTask( 'js', [ 'jshint', 'uglify', 'qunit' ] );

	// Theme CSS
	grunt.registerTask( 'css-themes', [ 'sass:themes' ] );

	// Core framework CSS
	grunt.registerTask( 'css-core', [ 'sass:core', 'sass:extras', 'autoprefixer', 'cssmin' ] );

	// All CSS
	grunt.registerTask( 'css', [ 'sass', 'autoprefixer', 'cssmin' ] );

	// Package presentation to archive
	grunt.registerTask( 'package', [ 'default', 'zip' ] );

	// Serve presentation locally
	grunt.registerTask( 'serve', [ 'connect', 'watch' ] );

	// Run tests
	grunt.registerTask( 'test', [ 'jshint', 'qunit' ] );

};
