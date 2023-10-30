-- Table pour les films
CREATE TABLE films (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(128) NOT NULL,
    description VARCHAR(2048) NOT NULL,
    date_parution DATE NOT NULL
);

-- Table pour les acteurs et réalisateurs 
-- J'utilise une seule table car un acteur peut être un réalisateur et invertse
CREATE TABLE personnes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(128) NOT NULL,
    prenom VARCHAR(128) NOT NULL,
    date_naissance DATE NOT NULL,
    type ENUM('acteur', 'realisateur') NOT NULL  -- Indique si la personne est un acteur, un réalisateur ou les deux
);

-- Table de liaison entre les films et les personnes
-- Cela permet de gererr les acteurs d'un film et le réalisateur d'un film
CREATE TABLE films_personnes (
    film_id INT NOT NULL,
    personne_id INT NOT NULL,
    role ENUM('acteur', 'realisateur') NOT NULL, 
    FOREIGN KEY (film_id) REFERENCES films(id),
    FOREIGN KEY (personne_id) REFERENCES personnes(id),
    PRIMARY KEY (film_id, personne_id, role)  
);
