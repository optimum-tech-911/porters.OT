import fs from 'fs';
import https from 'https';

const logos = [
  { name: 'banque-populaire', domain: 'banquepopulaire.fr' },
  { name: 'caisse-epargne', domain: 'caisse-epargne.fr' },
  { name: 'casden', domain: 'casden.fr' },
  { name: 'credit-cooperatif', domain: 'credit-cooperatif.coop' },
  { name: 'novobanco', domain: 'novobanco.pt' },
  { name: 'oney', domain: 'oney.com' },
  { name: 'palatine', domain: 'palatine.fr' },
  { name: 'natixis', domain: 'natixis.com' }
];

logos.forEach(logo => {
  const url = `https://www.google.com/s2/favicons?domain=${logo.domain}&sz=128`;
  const file = fs.createWriteStream(`public/images/logos/${logo.name}.png`);
  https.get(url, response => {
    response.pipe(file);
    file.on('finish', () => {
      file.close();
      console.log(`Downloaded ${logo.name}.png`);
    });
  }).on('error', err => {
    fs.unlink(`public/images/logos/${logo.name}.png`, () => {});
    console.error(`Error downloading ${logo.name}: ${err.message}`);
  });
});
