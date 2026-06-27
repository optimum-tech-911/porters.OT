import fs from 'fs';
import https from 'https';

const logos = [
  { name: 'banque-populaire', url: 'https://upload.wikimedia.org/wikipedia/fr/4/41/Logo_Banque_Populaire_2018.svg' },
  { name: 'caisse-epargne', url: 'https://upload.wikimedia.org/wikipedia/fr/4/42/Logo_Caisse_d%27%C3%89pargne.svg' },
  { name: 'casden', url: 'https://upload.wikimedia.org/wikipedia/fr/c/cf/Logo_CASDEN.svg' },
  { name: 'credit-cooperatif', url: 'https://upload.wikimedia.org/wikipedia/fr/7/7b/Logo_Cr%C3%A9dit_Coop%C3%A9ratif_%282020%29.svg' },
  { name: 'novobanco', url: 'https://upload.wikimedia.org/wikipedia/commons/e/ee/Novo_Banco.svg' },
  { name: 'oney', url: 'https://upload.wikimedia.org/wikipedia/commons/d/df/Logo_Oney_Bank.svg' },
  { name: 'palatine', url: 'https://upload.wikimedia.org/wikipedia/fr/e/eb/Banque_Palatine_logo.svg' },
  { name: 'natixis', url: 'https://upload.wikimedia.org/wikipedia/fr/9/91/Logo_Natixis.svg' }
];

const options = {
  headers: {
    'User-Agent': 'ThePortersBot/1.0 (contact@theporters.com) Node.js/20'
  }
};

logos.forEach(logo => {
  const file = fs.createWriteStream(`public/images/logos/${logo.name}.svg`);
  https.get(logo.url, options, response => {
    response.pipe(file);
    file.on('finish', () => {
      file.close();
      console.log(`Downloaded ${logo.name}.svg`);
    });
  }).on('error', err => {
    fs.unlink(`public/images/logos/${logo.name}.svg`, () => {});
    console.error(`Error downloading ${logo.name}: ${err.message}`);
  });
});
