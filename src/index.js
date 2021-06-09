const pdf = require('html-pdf');
const ejs = require('ejs');
let html;

ejs.renderFile('./base.ejs', {}, (err, data) => {
    if (err) {
        console.log(err)
    } else {
        html = data
    }
})


pdf.create(html, {
    format: 'A4',
    orientation: 'landscape',

}).toFile('./niedson.pdf', (err, res) => {
    if (err) {
        console.error(err)
    } else {
        console.log(res)
    }
})
