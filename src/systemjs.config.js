(function (global) {
  System.config({
    paths: {
      // paths serve as alias
      'npm:': 'node_modules/'
    },
    // map tells the System loader where to look for things
    map: {
      // our app is within the app folder
      app: 'dist',
      main: 'main.js',

      // angular bundles
      '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
      '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
      '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
      '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
      '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
      '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
      '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',

      // other libraries

      'rxjs':                         'npm:rxjs',
      'angular-in-memory-web-api':    'npm:angular-in-memory-web-api',
      'ts':                           'npm:plugin-typescript@4.0.10/lib/plugin.js',
      'typescript':                   'npm:typescript@2.0.2/lib/typescript.js',
      'moment':                       'npm:moment/moment.js',
      'ng2-bootstrap/ng2-bootstrap':  'npm:ng2-bootstrap@1.1.14/bundles/ng2-bootstrap.umd.min.js',
      'ng2-typeahead':              'node_modules/ng2-typeahead'

    },
    // packages tells the System loader how to load when no filename and/or no extension
    packages: {


      app: {main: 'main.js', defaultExtension: 'js'},
      api: {defaultExtension: 'js'},
      'ng2-search-filter': { main: 'dist/index.js' },
      'angular-in-memory-web-api': {
        main: './index.js',
        defaultExtension: 'js'
      },
      'ng2-typeahead': {main: 'ng2-typeahead.js', defaultExtension: 'js'},
      rxjs: {defaultExtension: 'js'},
      'node_modules/primeng': {
        format: 'cjs',
        defaultExtension: 'js'
      }
    }

  });
})(this);
