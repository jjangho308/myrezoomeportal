/**
 * Build script
 * 
 * #1. Minify client-side javacsript files. <br />
 * #2. Minify client-side css stylesheet files. <br />
 * 
 * Minifed files are included if and only if in case of <br />
 * enviroment is stage or production. <br />
 * 
 * 
 * @since 180621
 * @author TACKSU
 * 
 */
const fs = require('fs');
const path = require('path');
const uglifyjs = require('uglify-js');
const uglifycss = require('uglifycss');

const sep = path.sep;

const jsroot = `.${sep}public${sep}js${sep}`;
const cssroot = `.${sep}public${sep}css`;

console.info('Minifying Javscript files...')
minifyPublicJS(jsroot);

console.info('Minifying CSS files...')
minifyPublicCSS(cssroot);

function minifyPublicJS(file) {

    fs.stat(file, (err, stats) => {
        if (stats.isDirectory()) {
            if (!file.endsWith('libs')) {
                fs.readdir(file, (err, files) => {
                    files.forEach(subFile => {
                        minifyPublicCSS(`${file}${sep}${subFile}`);
                    })
                });
            }
        } else if (file.endsWith('.js') && !file.endsWith('.min.js')) {
            fs.readFile(file, {
                encoding: 'utf8',
            }, (err, data) => {
                var result = uglifyjs.minify(data, {
                    output: {
                        beautify: false,
                    }
                });
                if (!!result.error) {
                    console.log(`Minify error : ${file}`);
                    console.error(result.error);
                }
                var targetFile = file.replace('.js', '.min.js');
                fs.writeFile(targetFile, JSON.stringify(result), err => {
                    if (!!err) {
                        console.error(`File write error : ${file}`);
                        console.error(err);
                    } else {
                        console.info(`From  : ${file}`);
                        console.info(`To    : ${targetFile}`);
                    }
                });
            });
        }
    });
}


function minifyPublicCSS(file) {
    console.info('Minify : ' + file);
    fs.stat(file, (err, stats) => {
        if (stats.isDirectory()) {
            if (!file.endsWith('libs')) {
                fs.readdir(file, (err, files) => {
                    files.forEach(subFile => {
                        minifyPublicCSS(`${file}${sep}${subFile}`);
                    })
                });
            }
        } else if (file.endsWith('.css') && !file.endsWith('.min.css')) {
            fs.readFile(file, {
                encoding: 'utf8'
            }, (err, data) => {
                var minified = uglifycss.processString(data);
                if (!!minified.error) {
                    console.error(`File minify error : ${file}`);
                    console.error(minified.error);
                }
                var targetFile = file.replace('.css', '.min.css');
                fs.writeFile(targetFile, minified.result, err => {
                    if (!!err) {
                        console.error(`File write error : ${file}`);
                        console.error(err);
                    } else {
                        console.info(`From  : ${file}`);
                        console.info(`To    : ${targetFile}`);
                    }
                });
            });
        }
    });
}