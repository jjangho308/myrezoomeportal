import fs from 'fs';
import pdfKit from 'pdfkit';
import blobStream from 'blob-stream';
import PDFManager from '../modules/pdf/pdf';
import initialize from '../core/initializer';

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
