CREATE DATABASE mood_journal;
USE mood_journal;
CREATE TABLE entries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    text TEXT NOT NULL,
    emotion VARCHAR(50),
    score FLOAT,
    date DATETIME
);
