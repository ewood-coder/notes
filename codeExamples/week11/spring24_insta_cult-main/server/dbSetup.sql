-- Active: 1715633441965@@127.0.0.1@3306@adaptable_shaman_540684_db
CREATE TABLE
  IF NOT EXISTS accounts (
    id VARCHAR(255) NOT NULL primary key COMMENT 'primary key',
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT 'Time Created',
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Last Update',
    name varchar(255) COMMENT 'User Name',
    email varchar(255) COMMENT 'User Email',
    picture varchar(255) COMMENT 'User Picture'
  ) default charset utf8mb4 COMMENT '';

CREATE TABLE
  cults (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    name VARCHAR(255) NOT NULL,
    fee INT UNSIGNED NOT NULL,
    description VARCHAR(10000) NOT NULL,
    coverImg VARCHAR(1000) NOT NULL,
    leaderId VARCHAR(255) NOT NULL,
    FOREIGN KEY (leaderId) REFERENCES accounts (id) ON DELETE CASCADE,
    UNIQUE (name) -- Cults cannot have the same name
  );

INSERT INTO
  cults (name, fee, description, coverImg, leaderId)
VALUES
  (
    "Jeremy's nasty little goblins",
    0,
    "Goblin around the fire, collect jewels",
    "https://images.unsplash.com/photo-1533575770077-052fa2c609fc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGZpcmVwaXR8ZW58MHx8MHx8fDA%3D",
    "65f87bc1e02f1ee243874743"
  ),
  (
    "Bad dudes",
    1000,
    "Are you a bad enough dude to join this cult? Must be under 6'.",
    "https://images.unsplash.com/photo-1512209840695-c9b154d2a2aa?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z29ibGlufGVufDB8fDB8fHww",
    "6632ba3d2f68638590fa2dbf"
  );

DROP TABLE cults;

SELECT
  *
FROM
  accounts;

SELECT
  *
FROM
  cults;

CREATE TABLE
  cultMembers (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    cultId INT NOT NULL,
    accountId VARCHAR(255) NOT NULL,
    FOREIGN KEY (cultId) REFERENCES cults (id) ON DELETE CASCADE,
    FOREIGN KEY (accountId) REFERENCES accounts (id) ON DELETE CASCADE,
    UNIQUE (accountId, cultId) -- I can only join each cult once
  );

DROP TABLE cultMembers;

INSERT INTO
  cultMembers (cultId, accountId)
VALUES
  (6, '65f87bc1e02f1ee243874743');

SELECT
  cultMembers.*,
  accounts.*
FROM
  cultMembers
  JOIN accounts ON accounts.id = cultMembers.accountId
WHERE
  cultMembers.id = 1;