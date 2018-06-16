var fs = require('fs');
var pdfKit = require('pdfkit');
var blobStream = require('blob-stream');
var PDFManager = require('../modules/pdf/pdf');
var initialize = require('../core/initializer');

describe.skip('PDF Test Suit', () => {
    var pdf;

    before('PDF module init', () => {
        // server.listen(4000);
        Initializer();
    });

    it('TC#1 PDFManger.makePDF', done => {
        try {
            pdf.makePDF(pdfKit, blobStream, "TEST", null);
        } catch (exception) {
            //console.log(exception);
        }
            
        fs.exists('certificate.pdf', function (exists) {
            if (exists) {
                done();
            } else {
                
            }
        });
    });

    after(function () {
        fs.unlink('certificate.pdf', function (error) {
            if(error) {
                console.log(error);
            }
        });
    });
});
