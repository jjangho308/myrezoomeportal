'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _abstract_manager = require('../abstract_manager');var _abstract_manager2 = _interopRequireDefault(_abstract_manager);
var _fs = require('fs');var _fs2 = _interopRequireDefault(_fs);
var _qrcode = require('qrcode');var _qrcode2 = _interopRequireDefault(_qrcode);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}

/**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * PDFManager. <br />
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @since 180305
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */var
PDFkManager = function (_AbstractManager) {_inherits(PDFkManager, _AbstractManager);
    function PDFkManager(opt) {_classCallCheck(this, PDFkManager);return _possibleConstructorReturn(this, (PDFkManager.__proto__ || Object.getPrototypeOf(PDFkManager)).call(this,
        opt));
    }_createClass(PDFkManager, [{ key: 'init', value: function init()

        {

        } }, { key: 'makePDF', value: function makePDF(

        PDFDocument, lorem, res) {
            _qrcode2.default.toDataURL(JSON.stringify(lorem), function (error, qr_url) {

                if (error) {
                    console.log(error);
                }

                try {
                    var doc = new PDFDocument({
                        size: 'A4'
                        //layout: 'landscape' // default is portrait
                    });

                    // create file and http response
                    doc.pipe(_fs2.default.createWriteStream('public/certificate.pdf'));

                    // QR코드 입력
                    doc.image(qr_url, 490, 0, {
                        fit: [100, 100],
                        align: 'center',
                        valign: 'center' });


                    doc.font('public/fonts/test.ttf').
                    fontSize(35).
                    text("어학증명서", 50, 120, {
                        align: 'center' });


                    doc.fontSize(25).
                    text("이름       : ", 100, 250);

                    doc.fontSize(25).
                    text(lorem.name, 250, 250).
                    underline(250, 275, 100, 1);

                    doc.fontSize(25).
                    text("생년월일 : ", 100, 300);

                    doc.fontSize(25).
                    text(lorem.birthday, 250, 300).
                    underline(250, 325, 100, 1);

                    doc.fontSize(25).
                    text("점수       : ", 100, 350);

                    doc.fontSize(25).
                    text(lorem.grade, 250, 350).
                    underline(250, 375, 100, 1);

                    doc.fontSize(25).
                    text("발급일자  : ", 100, 400);

                    doc.fontSize(25).
                    text(lorem.publish_date, 250, 400).
                    underline(250, 425, 150, 1);

                    doc.fontSize(25).
                    text("위의 사실을 증명합니다.", 50, 500, {
                        align: 'center' });


                    doc.fontSize(20).
                    text("2018년 03월 08일", 50, 600, {
                        align: 'center' });


                    doc.fontSize(40).
                    text("레주메(주)", 50, 700, {
                        align: 'center' });


                    doc.image('public/images/dojang.png', 320, 680, {
                        fit: [80, 80],
                        align: 'center',
                        valign: 'center' });


                    // end and display the document in the iframe to the right
                    doc.end();
                    //doc.pipe(res);    

                    //res.render('pdfview', {pdf: 'certificate.pdf'});
                    //res.send("ok")

                    res.send({ data: '/certificate.pdf' });
                } catch (execption) {
                    console.log(execption);
                }
            });
        } }]);return PDFkManager;}(_abstract_manager2.default);exports.default =


PDFkManager;
//# sourceMappingURL=pdf.js.map