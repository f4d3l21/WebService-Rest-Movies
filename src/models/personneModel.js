const db = require('../config/db');

const Personne = {
    getAll: async () => {
        const [personnes] = await db.query("SELECT * FROM personnes");
        return personnes;
    },

    getById: async (id) => {
        const [personne] = await db.query("SELECT * FROM personnes WHERE id = ?", [id]);
        return personne[0];
    },

    getActeurs: async () => {
        const [acteurs] = await db.query("SELECT * FROM personnes WHERE type IN ('acteur')");
        return acteurs;
    },

    getRealisateurs: async () => {
        const [realisateurs] = await db.query("SELECT * FROM personnes WHERE type IN ('réalisateur')");
        return realisateurs;
    },

    create: async (nom, prenom, date_naissance, type) => {
        const [result] = await db.query("INSERT INTO personnes (nom, prenom, date_naissance, type) VALUES (?, ?, ?, ?)", [nom, prenom, date_naissance, type]);
        return result.insertId;
    },

    update: async (id, nom, prenom, date_naissance, type) => {
        await db.query("UPDATE personnes SET nom = ?, prenom = ?, date_naissance = ?, type = ? WHERE id = ?", [nom, prenom, date_naissance, type, id]);
    },

    delete: async (id) => {
        await db.query("DELETE FROM personnes WHERE id = ?", [id]);
    }
};

module.exports = Personne;
