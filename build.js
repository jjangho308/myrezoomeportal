/**
 * Build script
 */

const path = require('path');
const uglifyjs = require('uglify-js');
const uglifycss = require('uglifycss');

const fs = require('fs');

const sep = path.sep;

const jsdir = `.${sep}public${sep}js${sep}`;
const cssroot = `.${sep}public${sep}css`;

fs.readdir(jsdir, (err, files) => {
    files.forEach(file => {
        console.log(file);
        fs.stat(`${jsdir}${file}`, (err, stats) => {
            if (stats.isDirectory()) {
                if (!file.endsWith('libs')) {
                    fs.readdir(`${jsdir}${file}`, (err, files) => {
                        files.forEach(subFile => {
                            if (subFile.endsWith('.js') && !subFile.endsWith('.min.js')) {
                                fs.readFile(`${jsdir}${file}${sep}${subFile}`, {
                                    encoding: 'utf8',
                                }, (err, data) => {
                                    var result = uglifyjs.minify(data, {
                                        output: {
                                            beautify: false,
                                        }
                                    });
                                    console.log('File : ' + `${jsdir}${file}${sep}${subFile}`);
                                    console.error(JSON.stringify(result.error));
                                    fs.writeFile(`${jsdir}${file}${sep}${subFile.replace('.', '.min.')}`, result.code, err => {
                                        if (!!err) {
                                            console.error(err);
                                        }
                                    });
                                });
                            }
                        });
                    });
                }
            } else if (!file.endsWith('.min.js')) {

                fs.readFile(`${jsdir}${file}`, {
                    encoding: 'utf8',
                }, (err, data) => {
                    var result = uglifyjs.minify(data, {
                        output: {
                            beautify: false,
                        }
                    });
                    console.log('File : ' + `${jsdir}${file}`);
                    console.error(JSON.stringify(result.error));
                    fs.writeFile(`${jsdir}${file.replace('.', '.min.')}`, JSON.stringify(result), err => {
                        if (!!err) {
                            console.error(err);
                        }
                    });
                });
            }
        });
    });
});

minifyCss(cssroot);
function minifyCss(file) {
    fs.stat(file, (err, stats) => {
        if (stats.isDirectory()) {
            if (!file.endsWith('libs')) {
                fs.readdir(file, (err, files) => {
                    files.forEach(subFile => {
                        minifyCss(subFile);
                    })
                });
            }
        } else if (file.endsWith('.css') && !file.endsWith('.min.css')) {
            fs.readFile(file, {
                encoding: 'utf8'
            }, (err, data) => {
                var minified = uglifycss.processString(data);
                if (!!minified.error) {
                    console.error('File minify error : ' + file);
                    console.error(minified.error);
                }
                fs.writeFile(file.replace('.', '.min.'), minified.result, err => {
                    if (!!err) {
                        console.error('File write error : ' + file);
                        console.error(err);
                    }
                });
            });
        }
    });
}