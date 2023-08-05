CREATE TABLE MEMBER (
                        id INT PRIMARY KEY AUTO_INCREMENT,
                        country VARCHAR(255) NOT NULL,
                        profile_image_url VARCHAR(255),
                        nickname VARCHAR(12) NOT NULL,
                        nickname_updated_at DATETIME NOT NULL,
                        statement VARCHAR(30),
                        role VARCHAR(255) NOT NULL,
                        created_at DATETIME NOT NULL,
                        deleted_at DATETIME
);

INSERT INTO MEMBER (id, country, profile_image_url, nickname, nickname_updated_at, statement, role, created_at)
VALUES (1, 'KOREA', 'url1', 'sanan', CURRENT_TIMESTAMP, '안녕하세요 하루애비입니다.', 'USER', CURRENT_TIMESTAMP);

INSERT INTO MEMBER (id, country, profile_image_url, nickname, nickname_updated_at, statement, role, created_at)
VALUES (2, 'JAPAN', 'url2', 'jpark2', CURRENT_TIMESTAMP, '와타시와 국힙 원탑 데스', 'USER', CURRENT_TIMESTAMP);

INSERT INTO MEMBER (id, country, profile_image_url, nickname, nickname_updated_at, statement, role, created_at)
VALUES (3, 'USA', 'url3', 'hyungnoh', CURRENT_TIMESTAMP, 'Im a Baddest boy in The hood', 'USER', CURRENT_TIMESTAMP);

INSERT INTO MEMBER (id, country, profile_image_url, nickname, nickname_updated_at, statement, role, created_at)
VALUES (4, 'GERMANY', 'url4', 'mingkang', CURRENT_TIMESTAMP, 'Guten TakTakTak', 'USER', CURRENT_TIMESTAMP);

INSERT INTO MEMBER (id, country, profile_image_url, nickname, nickname_updated_at, statement, role, created_at)
VALUES (5, 'FRANCE', 'url5', 'joon-lee', CURRENT_TIMESTAMP, 'Bonjour Tous Les Jours', 'USER', CURRENT_TIMESTAMP);