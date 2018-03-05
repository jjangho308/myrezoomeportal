import AbstractManager from "./abstract";
import fs from 'fs';

/**
 * PDFManager. <br />
 * 
 * @since 180305
 */
class PDFkManager extends AbstractManager {
    constructor(opt) {
        super(opt);
    }

    init() {

    }

    makePDF(PDFDocument, blobStream, lorem, res) {
        // create a document and pipe to a blob
        var doc = new PDFDocument();
        var stream = doc.pipe(blobStream());
        doc.pipe(fs.createWriteStream('certificate.pdf'));

        // draw some text
        doc.fontSize(25)
            .text(lorem, 100, 80);

        // // and some justified text wrapped into columns
        // doc.text(lorem, 100, 300)
        //     .font('Times-Roman', 13)
        //     .moveDown()
        //     .text(lorem, {
        //       width: 412,
        //       align: 'justify',
        //       indent: 30,
        //       columns: 2,
        //       height: 300,
        //       ellipsis: true
        //     });

        doc.image('public/images/twice.jpg', {
            fit: [400, 400],
            align: 'center',
            valign: 'center'
        });

        // // some vector graphics
        // doc.save()
        //     .moveTo(100, 150)
        //     .lineTo(100, 250)
        //     .lineTo(200, 250)
        //     .fill("#FF3300");

        // doc.circle(280, 200, 50)
        //     .fill("#6600FF");

        // // an SVG path
        // doc.scale(0.6)
        //     .translate(470, 130)
        //     .path('M 250,75 L 323,301 131,161 369,161 177,301 z')
        //     .fill('red', 'even-odd')
        //     .restore();  

        // end and display the document in the iframe to the right
        doc.end();

        stream.on('finish', function () {
            //iframe.src = stream.toBlobURL('application/pdf');
            //res.render('pdfview', { title: 'Rezoome HTML' , src: stream.toBlobURL('application/pdf') });
            //stream.toBlobURL('application/pdf')
            //console.log(stream.toBlobURL('application/pdf'));

            //stream.toBlobURL('application/pdf');
        });

        res.contentType("application/pdf");
        doc.pipe(res);
    }
}

export default PDFkManager;