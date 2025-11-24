// karma.conf.js
module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],

    // --- CAMBIO 1: AÑADIR setupTests.js ---
    // Le decimos a Karma que cargue este archivo primero
    // para que las funciones de testing estén disponibles.
    files: [
      'src/setupTests.js',  
      'src/**/*.spec.js'    
    ],
    // --- FIN DEL CAMBIO 1 ---

    preprocessors: {
      'src/setupTests.js': ['webpack'], 
      'src/**/*.spec.js': ['webpack']
    },
    // SECCIÓN DE WEBPACK AUTÓNOMA
    webpack: {
      mode: 'development',
      module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-react', '@babel/preset-env']
              }
            }
          },
          {
            test: /\.(css|scss)$/,
            use: ['style-loader', 'css-loader']
          },
          {
            test: /\.(png|jpe?g|gif|webp)$/,
            type: 'asset/inline'
          }
        ]
      },
      resolve: {
        extensions: ['.js', '.jsx']
      }
    },
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    
    browsers: ['Chrome'],
    
    singleRun: false,
    concurrency: Infinity
  });
};