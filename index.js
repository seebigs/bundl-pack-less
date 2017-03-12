/**
 * LESS processor for Bundl
 * Pipes output into the default CSS processor
 */

var less = require('less');
var path = require('path');

module.exports = function (options) {
    options = options || {};
    options.syncImport = true; // makes less process sync even when imports are used

    return function (getProcessor, packOptions) {
        packOptions = packOptions || {};
        var cssOptions = Object.assign({}, packOptions.css, { autoInject: options.autoInject });
        var cssProcessor = getProcessor('css');

        function processor (file) {
            var contents = file.contents;
            var opts = Object.assign({}, options, { paths: [path.dirname(file.path || process.cwd())] });

            // convert less to css
            less.render(contents, opts, function (error, output) {
                if (error) {
                    console.log(error);
                } else {
                    contents = output.css;
                }
            });

            // pipe into default css processor
            return cssProcessor.processor({ contents: contents }, cssOptions, 'less');
        }

        return {
            processor: processor,
            requireAs: options.autoInject !== false && cssProcessor.requireAs
        };
    };

};
