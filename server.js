import express from 'express';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';

const swaggerDocument = JSON.parse(fs.readFileSync('./src/config/documentation.json', 'utf8'));

dotenv.config();

const swaggerOptions = {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: "Pokemon API"
};

const app = express();
const port = process.env.PORT || 3030;

app.use(express.json());

app.use('/api/docs',
        swaggerUi.serve,
        swaggerUi.setup(swaggerDocument, swaggerOptions));

app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}`);
});