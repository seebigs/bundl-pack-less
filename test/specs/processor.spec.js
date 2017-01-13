
var processorLess = require('../../index.js');
var builtIn = {
    css: {
        processor: function (file) {
            return file.contents + '(via css)';
        },
        autoInject: function () {

        }
    }
};

describe('processor', function () {

    describe('does the job', function (expect) {
        var processor = processorLess('less', builtIn);
        var output = processor.processor({ contents: '.foo{ color:blue; .bar{ color:red; } }' });
        expect(output).toBe('.foo {\n  color: blue;\n}\n.foo .bar {\n  color: red;\n}\n(via css)');
    });

});
