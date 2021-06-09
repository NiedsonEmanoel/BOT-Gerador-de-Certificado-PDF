const gerarCertificado = async (title, subtitle, name, initialDescription, boldDescription, finalDescription, entity, entityCredential) => {
    const pdf = require('html-pdf');
    const ejs = require('ejs');
    let html;

    ejs.renderFile('./base.ejs', {
        title,
        subtitle,
        name,
        initialDescription,
        boldDescription,
        finalDescription,
        entity,
        entityCredential
    }, (err, data) => {
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
            return res.filename;
        }
    })
}

(async () => {
    await gerarCertificado(
        "CERTIFICADO",
        "Confiro o presente certificado a",
        'Niedson Emanoel Almeida Brito',
        "Por assistir a palestra",
        "Destruindo a Skynet: tetagshjkshskgsdsdg",
        "com total de 1 hora e 30 minutos. A palestra foi realizada no evento kkkkkkkkkkkkkkkkkkkkkkkkkkkkkk.",
        "Niedson Emanoel",
        "Programador sem nada pra fazer de madruga."
    )
})();