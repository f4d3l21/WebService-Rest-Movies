const express = require('express');
const app = express();
const routes = require('./routes/route');

// const db = require('./config/db');

// app.get('/', async (req, res) => {
//     try {
//         const conn = await db.getConnection();

//         // recuperer les info du film le grand Voyage
//         const film = await conn.query("SELECT * FROM films WHERE nom = 'Le grand Voyage'");
        
//         // recueprer le casting du film
//         const casting = await conn.query(`SELECT personnes.nom, personnes.prenom, films_personnes.role FROM personnes 
//                                           JOIN films_personnes ON personnes.id = films_personnes.personne_id 
//                                           WHERE films_personnes.film_id = ?`, [film[0].id]);

//         // Afficher les res
//         res.send(`
//             <h1>${film[0].nom}</h1>
//             <p>${film[0].description}</p>
//             <p>Date de parution: ${film[0].date_parution}</p>
//             <h2>Casting:</h2>
//             <ul>
//                 ${casting.map(person => `<li>${person.prenom} ${person.nom} - ${person.role}</li>`).join('')}
//             </ul>
//         `);

//     } catch (err) {
//         console.log(err);
//         res.status(500).send("Erreur lors de la récupération des données");
//     }
// });


app.get('/', (req, res) => {
    res.send('Bienvenue sur mon serveur!');
});


app.use(express.json());  
app.use('/api', routes); 

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
