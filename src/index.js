const pdf = require('html-pdf');
const ejs = require('ejs');
let html;
let initialDate = new Date();

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
}).toFile('./certificate.pdf', (err, res) => {
    if (err) {
        console.error(err)
    } else {
        console.log(res)

        let timeFinal = (new Date().getTime() - initialDate.getTime()) / 1000

        console.log('Tempo real: ', timeFinal.toFixed(2), 'Segundos.')

        while (timeFinal % 2 !== 0) {
            timeFinal = (new Date().getTime() - initialDate.getTime()) / 1000
        }

        console.log('Tempo arredondado: ', timeFinal.toFixed(2), 'Segundos.')
    }
})

