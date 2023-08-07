-- auto-generated definition
create table member
(
    id                  bigint auto_increment
        primary key,
    oauth_type          varchar(32)                                                                                                                                                                                                                                                                                                               not null,
    oauth_id            varchar(255)                                                                                                                                                                                                                                                                                                                               not null,
    oauth_name          varchar(255)                                                                                                                                                                                                                                                                                                                               null,
    nickname            varchar(12)                                                                                                                                                                                                                                                                                                                                not null,
    nickname_updated_at datetime(6)                                                                                                                                                                                                                                                                                                                                not null,
    country             varchar(32)                                                                                                                                                                                                                                                                                                                                not null,
    language            varchar(32)                                                                                                                                                                                                                                                           not null,
    statement           varchar(30)                                                                                                                                                                                                                                                                                                                                null,
    profile_image_url   varchar(255)                                                                                                                                                                                                                                                                                                                               null,
    role                varchar(32)                                                                                                                                                                                                                                                                                                                     not null,
    created_at          datetime(6)                                                                                                                                                                                                                                                                                                                                not null,
    deleted_at          datetime(6)                                                                                                                                                                                                                                                                                                                                null
);
-- auto-generated definition
create table animal_category
(
    id      bigint auto_increment
        primary key,
    species varchar(32) not null
);
-- auto-generated definition
create table block
(
    member_id        bigint      not null,
    target_member_id bigint      not null,
    blocked_at       datetime(6) not null,
    primary key (member_id, target_member_id),
    constraint FKh5v5s5r99ghk8xqk8hot1a9r
        foreign key (target_member_id) references member (id),
    constraint FKi6rv4kp05ck63ch9oukxjwn5f
        foreign key (member_id) references member (id)
);
-- auto-generated definition
create table board
(
    id            bigint auto_increment
        primary key,
    member_id     bigint                     not null,
    content       varchar(255)               not null,
    visible_scope varchar(32) not null,
    created_at    datetime(6)                not null,
    deleted_at    datetime(6)                null,
    updated_at    datetime(6)                not null,
    constraint FKsds8ox89wwf6aihinar49rmfy
        foreign key (member_id) references member (id)
);
-- auto-generated definition
create table board_category_filter
(
    provider_id bigint not null,
    consumer_id bigint not null,
    primary key (consumer_id, provider_id),
    constraint FK1prxwta0lkm2dfs1eykf1adal
        foreign key (provider_id) references animal_category (id),
    constraint FKdjn9tw74nwr1qx2xrrvtf3iak
        foreign key (consumer_id) references board (id)
);
-- auto-generated definition
create table board_media
(
    id          bigint auto_increment
        primary key,
    board_id    bigint                  not null,
    media_index int                     not null,
    media_type  varchar(32) not null,
    media_url   varchar(255)            not null,
    constraint FKf8tyql3th2klhxwlfi1nn5a3f
        foreign key (board_id) references board (id)
);
-- auto-generated definition
create table comment
(
    id         bigint auto_increment
        primary key,
    board_id   bigint      not null,
    member_id  bigint      not null,
    created_at datetime(6) not null,
    deleted_at datetime(6) null,
    constraint FKlij9oor1nav89jeat35s6kbp1
        foreign key (board_id) references board (id),
    constraint FKmrrrpi513ssu63i2783jyiv9m
        foreign key (member_id) references member (id)
);
-- auto-generated definition
create table follow
(
    member_id        bigint      not null,
    target_member_id bigint      not null,
    followed_at      datetime(6) not null,
    primary key (member_id, target_member_id),
    constraint FKbv9fpsq0i3foaq6800gwday36
        foreign key (target_member_id) references member (id),
    constraint FKla8lvflaauks5sw7s0u44q6x0
        foreign key (member_id) references member (id)
);
-- auto-generated definition
create table member_category_filter
(
    provider_id bigint not null,
    consumer_id bigint not null,
    primary key (consumer_id, provider_id),
    constraint FKdb9dep6tmiym2lsnf06wk6ewc
        foreign key (provider_id) references animal_category (id),
    constraint FKdre5ucs11eliv4gg0ifp3vcyu
        foreign key (consumer_id) references member (id)
);
-- auto-generated definition
create table reaction
(
    id            bigint auto_increment
        primary key,
    board_id      bigint                not null,
    member_id     bigint                not null,
    reaction_type varchar(32) not null,
    created_at    datetime(6)           not null,
    constraint FK7bug6mxn1l3mq8wj67f9jxfv8
        foreign key (board_id) references board (id),
    constraint FKf0kgc48u5e6wakvieex07kk5w
        foreign key (member_id) references member (id)
);
-- auto-generated definition
create table report
(
    id                 bigint auto_increment
        primary key,
    board_id           bigint                                                                                                                 not null,
    comment_id         bigint                                                                                                                 not null,
    member_id          bigint                                                                                                                 not null,
    reported_member_id bigint                                                                                                                 not null,
    reason             varchar(32) not null,
    content            varchar(255)                                                                                                           null,
    created_at         datetime(6)                                                                                                            not null,
    constraint FK1dw2gwqqspkllnye2ylaiabqx
        foreign key (comment_id) references comment (id),
    constraint FK2mf8ehoy689ord40esx24n26e
        foreign key (board_id) references board (id),
    constraint FK3f6hlh2lko9py15mptqpwllkx
        foreign key (reported_member_id) references member (id),
    constraint FKel7y5wyx42a6njav1dbe2torl
        foreign key (member_id) references member (id)
);
-- auto-generated definition
create table scrap
(
    id         bigint auto_increment
        primary key,
    board_id   bigint      not null,
    member_id  bigint      not null,
    created_at datetime(6) not null,
    constraint FK46d2cvrgggcia4oean5lykfr
        foreign key (board_id) references board (id),
    constraint FKq0ff1jblgu8vrsh90u826qell
        foreign key (member_id) references member (id)
);

INSERT INTO member
(oauth_type, oauth_id, oauth_name, country, language, profile_image_url, nickname, nickname_updated_at, statement, role, created_at, deleted_at)
VALUES
    ('FORTY_TWO', '1', 'sanan', 'KOREA', 'KOREAN', 'PROFILE_IMAGE_URL1', '하루애비', '2023-01-01 00:00:00', '멀보노', 'USER', '2023-01-01 00:00:00', NULL),
    ('FORTY_TWO', '2', 'mingkang', 'USA', 'ENGLISH', 'PROFILE_IMAGE_URL2', '아롱오빠', '2023-02-01 00:00:00', '감귤 사실분', 'USER', '2023-02-01 00:00:00', NULL),
    ('FORTY_TWO', '3', 'jpark2', 'JAPAN', 'JAPANESE', 'PROFILE_IMAGE_URL3', '꼬비덕후', '2023-03-01 00:00:00', '내가 국힙원탑', 'USER', '2023-03-01 00:00:00', NULL),
    ('FORTY_TWO', '4', 'hyungnoh', 'FRANCE', 'FRENCH', 'PROFILE_IMAGE_URL3', '오덕십덕', '2023-03-01 00:00:00', '강아지가 세상을 구한다 어쩌구', 'USER', '2023-03-01 00:00:00', NULL),
    ('FORTY_TWO', '5', 'joon-lee', 'KOREA', 'ITALIAN', 'PROFILE_IMAGE_URL3', '준준준준준준준준준준', '2023-03-01 00:00:00', '함 뜨실?', 'USER', '2023-03-01 00:00:00', NULL);

INSERT INTO animal_category
(species)
VALUES
    ('DOG'),
    ('CAT'),
    ('FISH'),
    ('BIRD'),
    ('SMALL_ANIMAL'),
    ('REPTILE'),
    ('AMPHIBIAN'),
    ('INSECT'),
    ('ETC');