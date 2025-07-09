-- Create the database only if it doesn't already exist
CREATE DATABASE IF NOT EXISTS threats_db;

-- Switch to the database
USE threats_db;

-- Create 'threats' table if it doesn't exist
CREATE TABLE IF NOT EXISTS threats (
    id INT AUTO_INCREMENT PRIMARY KEY,
    threat_category VARCHAR(100),
    iocs TEXT,
    threat_actor VARCHAR(100),
    attack_vector VARCHAR(100),
    geo_location VARCHAR(100),
    forum_sentiment FLOAT,
    severity_score TINYINT,
    predicted_category VARCHAR(100),
    defense_mechanism VARCHAR(255),
    risk_level TINYINT,
    description TEXT,
    keywords TEXT,
    named_entities TEXT,
    topic_label VARCHAR(100),
    word_count INT
);

-- Create 'users' table if it doesn't exist
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

select * from threats;
select * from users;