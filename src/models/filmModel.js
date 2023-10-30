const db = require('../config/db');

const Film = {
    getAll: async () => {
        const [films] = await db.query("SELECT * FROM films");
        return films;
    },

    getById: async (id) => {
        const [film] = await db.query("SELECT * FROM films WHERE id = ?", [id]);
        
        if (film.length) {
            const [associatedPersons] = await db.query("SELECT personnes.* FROM personnes JOIN films_personnes ON personnes.id = films_personnes.personne_id WHERE films_personnes.film_id = ?", [id]);
            film[0].associatedPersons = associatedPersons;
        }
        
        return film[0];
    },

    create: async (titre, description, date_parution) => {
        const [result] = await db.query("INSERT INTO films (titre, description, date_parution) VALUES (?, ?, ?)", [titre, description, date_parution]);
        return result.insertId;
    },

    associatePerson: async (filmId, personneId) => {
        await db.query("INSERT INTO films_personnes (film_id, personne_id) VALUES (?, ?)", [filmId, personneId]);
    },

    update: async (id, titre, description, date_parution) => {
        await db.query("UPDATE films SET titre = ?, description = ?, date_parution = ? WHERE id = ?", [titre, description, date_parution, id]);
    },

    delete: async (id) => {
        await db.query("DELETE FROM films_personnes WHERE film_id = ?", [id]);
        await db.query("DELETE FROM films WHERE id = ?", [id]);
    }
};

module.exports = Film;
