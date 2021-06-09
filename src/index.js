const gerarCertificado = (title, subtitle, name, initialDescription,
    boldDescription,
    finalDescription,
    entity,
    entityCredential) => {
    return new Promise(async (resolve, reject) => {
        const { promisify } = require('util')
        const pdf = require('html-pdf');
        const uuid = require('uuid').v4;
        let html;

        const renderFile = promisify(require('ejs').renderFile);

        await renderFile('./base.ejs', {
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
        }).toFile(`certificate ${uuid()}.pdf`, (err, res) => {
            if (err) {
                reject(err)
            } else {
                resolve(res.filename);
            }
        })
    })
}

(async () => {
    try {
       let s = await gerarCertificado('CERTIFICADO', 'Confiro o presente certificado a', 'Niedson Emanoel', 'Por assistir a palestra', 'Growth hacker, uma nova forma de ver o instagram', 'com duração de 1 hora e 30 minutos no evendo the tdcbs news . net', 'Niedson Emanoel', 'Dev Masye')
      //  .then
        console.log(s)
    } catch (e) {

    }
})();