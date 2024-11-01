# Magness

Šis ir Magness projekts, kas nodrošina automašīnu iegādei katalogu ar funkcionālu filtru, kontakta sadaļu ar informāciju un vēstules opciju auto iegādei.

## Prasības

Lai palaistu šo projektu lokālajā vidē, jums nepieciešami sekojoši rīki:

- Node.js
- MongoD

## Sistēmas palaišanas vadlīnijas

### 1. Klonēt repozitoriju


git clone https://github.com/EmilsJur/Magness--.git

### 2. Instalēt atkarības

npm install express mongoose bcrypt crypto express-session

### 3. Palaist MongoDB serveri

Pārliecinieties, ka MongoDB serveris darbojas lokāli uz `mongodb://localhost:27017`.

### 4. Sākt serveri

node server.js

Serveris būs pieejams `http://localhost:3000`.

### 5. Testēt API ar Postman

Varat izmantot Postman, lai pārbaudītu API endpointus, piemēram, `GET /getCars` un `POST /submitContact`.

## Sistēmas izstrādes rīku saraksts

Šeit ir saraksts ar rīkiem un tehnoloģijām, kas izmantotas šajā projektā:

- [Node.js](https://nodejs.org/en/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [Postman](https://www.postman.com/) - API endpointu testēšanai
