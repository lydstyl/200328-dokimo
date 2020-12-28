# DOKIMO

Create receipts and other documents for your tenant(s).

DOKIMO vous permet d'éditer des documents immobiliers pour vos locataires tels que l'avis d'échéance, la quittance de loyer, le reçu partiel de loyer...

https://dokimo.netlify.app

## How to run in dev
- clone this repo
- copie the .env.exemple to .env
- create a firebase project
- change .env values with your firebase project settings
- npm i
- npm start

## To do:

- avis d'échéance bad date when new year

- register basic PWA
- batch green indicator if term already paid and red if not // to add when
- create collection properties & rentals instead of batches to be able to add expenses & calculate the profitability
- rent change letter with last indicator and batch begin date
- regularization of charges with water counters or do this appart with node.js
