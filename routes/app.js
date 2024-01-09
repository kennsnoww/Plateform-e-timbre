const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/generer-pdf', (req, res) => {
  const { nom, prenom, telephone } = req.body;

  const formulaireHtml = `
    <h2>Formulaire</h2>
    <p><strong>Nom:</strong> ${nom}</p>
    <p><strong>Prénom:</strong> ${prenom}</p>
    <p><strong>Téléphone:</strong> ${telephone}</p>
  `;

  // html2pdf pour générer le PDF
  const pdfOptions = {
    margin: 10,
    filename: 'formulaire.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  const html2pdf = require('html2pdf.js');
  const pdfBufferPromise = html2pdf().from(formulaireHtml).set(pdfOptions).outputPdf();

  pdfBufferPromise.then(pdfBuffer => {
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=formulaire.pdf');
    res.send(pdfBuffer);
  }).catch(error => {
    console.error(error);
    res.status(500).send('Erreur lors de la génération du PDF');
  });
});

app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
