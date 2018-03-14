'use strict';var _fs = require('fs');var _fs2 = _interopRequireDefault(_fs);
var _pdfkit = require('pdfkit');var _pdfkit2 = _interopRequireDefault(_pdfkit);
var _blobStream = require('blob-stream');var _blobStream2 = _interopRequireDefault(_blobStream);
var _pdf = require('../modules/pdf/pdf');var _pdf2 = _interopRequireDefault(_pdf);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

describe.skip('PDF Test Suit', function () {
    var pdf;

    before('PDF module init', function () {
        // server.listen(4000);
        pdf = new _pdf2.default();
    });

    it('TC#1 PDFManger.makePDF', function (done) {
        try {
            pdf.makePDF(_pdfkit2.default, _blobStream2.default, "TEST", null);
        } catch (exception) {
            //console.log(exception);
        }

        _fs2.default.exists('certificate.pdf', function (exists) {
            if (exists) {
                done();
            } else {

            }
        });
    });

    after(function () {
        _fs2.default.unlink('certificate.pdf', function (error) {
            if (error) {
                console.log(error);
            }
        });
    });
});
//# sourceMappingURL=pdf.test.js.map