
var lessProcessor = require('../../index.js')({});

function getProcessor (ext) {
    return {
        processor: function (file) {
            return file.contents + '(via css)';
        },
        autoInject: function () {

        }
    };
}

describe('processor', function () {

    describe('does the job', function (expect) {
        var p = lessProcessor(getProcessor);
        var output = p.processor({ contents: '.foo{ color:blue; .bar{ color:red; } }' });
        expect(output).toBe('.foo {\n  color: blue;\n}\n.foo .bar {\n  color: red;\n}\n(via css)');
    });

});
