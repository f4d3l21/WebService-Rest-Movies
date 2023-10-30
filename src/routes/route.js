const express = require('express');
const router = express.Router();

// Importation des modèles
const Film = require('../models/filmModel');
const Personne = require('../models/personneModel');

// Routes pour les films
router.get('/films', async (req, res) => {
    const films = await Film.getAll();
    res.json(films);
});

router.get('/films/:id', async (req, res) => {
    const film = await Film.getById(req.params.id);
    if (film) {
        res.json(film);
    } else {
        res.status(404).send('Film non trouvé');
    }
});

router.post('/films', async (req, res) => {
    const filmId = await Film.create(req.body.nom, req.body.description, req.body.date_parution);
    res.status(201).json({ id: filmId });
});

router.put('/films/:id', async (req, res) => {
    await Film.update(req.params.id, req.body.nom, req.body.description, req.body.date_parution);
    res.send('Film mis à jour');
});

router.delete('/films/:id', async (req, res) => {
    await Film.delete(req.params.id);
    res.send('Film supprimé');
});

// Routes pour les personnes (acteurs/réalisateurs)
router.get('/personnes', async (req, res) => {
    const personnes = await Personne.getAll();
    res.json(personnes);
});

router.get('/personnes/:id', async (req, res) => {
    const personne = await Personne.getById(req.params.id);
    if (personne) {
        res.json(personne);
    } else {
        res.status(404).send('Personne non trouvée');
    }
});

router.post('/personnes', async (req, res) => {
    const personneId = await Personne.create(req.body.nom, req.body.prenom, req.body.date_naissance, req.body.type);
    res.status(201).json({ id: personneId });
});

router.put('/personnes/:id', async (req, res) => {
    await Personne.update(req.params.id, req.body.nom, req.body.prenom, req.body.date_naissance, req.body.type);
    res.send('Personne mise à jour');
});

router.delete('/personnes/:id', async (req, res) => {
    await Personne.delete(req.params.id);
    res.send('Personne supprimée');
});

module.exports = router;
