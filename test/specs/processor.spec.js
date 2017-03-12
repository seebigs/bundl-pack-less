
var lessProcessor = require('../../index.js')({});

function getProcessor (ext) {
    return {
        processor: function (file) {
            return file.contents + '(via css)';
        }
    };
}

describe('processor', function () {

    describe('does the job', function (expect) {
        var p = lessProcessor(getProcessor);
        var output = p.processor({
            path: __dirname + '/processor.spec.js',
            contents: "@import '../fixtures/imported.less'; .foo{ color:blue; .bar{ color:red; } }"
        });
        expect(output).toBe('.and .more {\n  color: green;\n}\n.foo {\n  color: blue;\n}\n.foo .bar {\n  color: red;\n}\n(via css)');
    });

});
