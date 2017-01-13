/**
 * LESS processor for Bundl
 * Pipes output into the default CSS processor
 */

var less = require('less');

module.exports = function (options) {

    return function (getProcessor, packOptions) {
        packOptions = packOptions || {};
        var cssProcessor = getProcessor('css');

        function processor (file) {
            var contents = file.contents;

            // convert less to css
            less.render(contents, options, function(error, output) {
                contents = output.css;
            });

            // pipe into default css processor
            return cssProcessor.processor({ contents: contents }, packOptions.css);
        }

        return {
            processor: processor,
            requireAs: cssProcessor.autoInject
        };
    };

};
