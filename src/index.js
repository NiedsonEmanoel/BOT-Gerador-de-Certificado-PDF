module.exports = function (
    title,
    subtitle,
    name,
    initialDescription,
    boldDescription,
    finalDescription,
    entity,
    entityCredential,
    path
) {
    return new Promise(async (resolve, reject) => {
        const { promisify } = require('util')
        const pdf = require('html-pdf');
        let html;

        path.replace('.pdf', '')
        path = `${path}.pdf`

        const renderFile = promisify(require('ejs').renderFile);
        console.log('Gerando certificado...')
        await renderFile(__dirname + '/base.ejs', {
            title,
            subtitle,
            name,
            initialDescription,
            boldDescription,
            finalDescription,
            entity,
            entityCredential,
        }).then((e) => { html = e }).catch((e) => reject(e))


        pdf.create(html, {
            format: 'A4',
            orientation: 'landscape',
        }).toFile(path, (err, res) => {
            if (err) {
                reject(err)
            } else {
                console.log('Disponível em:', res.filename)
                resolve(res.filename);
            }
        })
    })
}

