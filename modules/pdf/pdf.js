import AbstractManager from "../abstract_manager";
import fs from 'fs';
import QRCode from 'qrcode';

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

    makePDF(PDFDocument, lorem, res) {
        QRCode.toDataURL(JSON.stringify(lorem), function (error, qr_url) {

            if (error) {
                console.log(error);
            }

            try {
                var doc = new PDFDocument({
                    size: 'A4',
                    //layout: 'landscape' // default is portrait
                });

                // create file and http response
                doc.pipe(fs.createWriteStream('public/certificate.pdf'));

                // QR코드 입력
                doc.image(qr_url, 490, 0, {
                    fit: [100, 100],
                    align: 'center',
                    valign: 'center'
                });

                doc.font('public/fonts/test.ttf')
                    .fontSize(35)
                    .text("어학증명서", 50, 120, {
                        align: 'center'
                    });

                doc.fontSize(25)
                    .text("이름       : ", 100, 250);

                doc.fontSize(25)
                    .text(lorem.name, 250, 250)
                    .underline(250, 275, 100, 1);

                doc.fontSize(25)
                    .text("생년월일 : ", 100, 300);

                doc.fontSize(25)
                    .text(lorem.birthday, 250, 300)
                    .underline(250, 325, 100, 1);

                doc.fontSize(25)
                    .text("점수       : ", 100, 350);

                doc.fontSize(25)
                    .text(lorem.grade, 250, 350)
                    .underline(250, 375, 100, 1);

                doc.fontSize(25)
                    .text("발급일자  : ", 100, 400);

                doc.fontSize(25)
                    .text(lorem.publish_date, 250, 400)
                    .underline(250, 425, 150, 1);

                doc.fontSize(25)
                    .text("위의 사실을 증명합니다.", 50, 500, {
                        align: 'center'
                    });

                doc.fontSize(20)
                    .text("2018년 03월 08일", 50, 600, {
                        align: 'center'
                    });

                doc.fontSize(40)
                    .text("레주메(주)", 50, 700, {
                        align: 'center'
                    });

                doc.image('public/images/dojang.png', 320, 680, {
                    fit: [80, 80],
                    align: 'center',
                    valign: 'center'
                });

                // end and display the document in the iframe to the right
                doc.end();     
                //doc.pipe(res);    
                
                //res.render('pdfview', {pdf: 'certificate.pdf'});
                //res.send("ok")
                
                res.send({data: '/certificate.pdf'});
            } catch (execption) {
                console.log(execption);
            }
        });
    }
}

export default PDFkManager;