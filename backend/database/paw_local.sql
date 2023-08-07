-- auto-generated definition
create table member
(
    created_at          datetime(6)                                                                                                                                                                                                                                                                                                                                not null,
    deleted_at          datetime(6)                                                                                                                                                                                                                                                                                                                                null,
    id                  bigint auto_increment
        primary key,
    nickname_updated_at datetime(6)                                                                                                                                                                                                                                                                                                                                not null,
    nickname            varchar(12)                                                                                                                                                                                                                                                                                                                                not null,
    statement           varchar(30)                                                                                                                                                                                                                                                                                                                                null,
    country             varchar(32)                                                                                                                                                                                                                                                                                                                                not null,
    language            varchar(32)                                                                                                                                                                                                                                                           not null,
    oauth_type          varchar(32)                                                                                                                                                                                                                                                                                                               not null,
    role                varchar(32)                                                                                                                                                                                                                                                                                                                     not null,
    oauth_id            varchar(255)                                                                                                                                                                                                                                                                                                                               not null,
    oauth_name          varchar(255)                                                                                                                                                                                                                                                                                                                               null,
    profile_image_url   varchar(255)                                                                                                                                                                                                                                                                                                                               null
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
    blocked_at       datetime(6) not null,
    member_id        bigint      not null,
    target_member_id bigint      not null,
    primary key (member_id, target_member_id),
    constraint FKh5v5s5r99ghk8xqk8hot1a9r
        foreign key (target_member_id) references member (id),
    constraint FKi6rv4kp05ck63ch9oukxjwn5f
        foreign key (member_id) references member (id)
);
-- auto-generated definition
create table board
(
    created_at    datetime(6)                not null,
    deleted_at    datetime(6)                null,
    id            bigint auto_increment
        primary key,
    member_id     bigint                     not null,
    updated_at    datetime(6)                not null,
    visible_scope varchar(32) not null,
    content       varchar(255)               not null,
    constraint FKsds8ox89wwf6aihinar49rmfy
        foreign key (member_id) references member (id)
);
-- auto-generated definition
create table board_category_filter
(
    consumer_id bigint not null,
    provider_id bigint not null,
    primary key (consumer_id, provider_id),
    constraint FK1prxwta0lkm2dfs1eykf1adal
        foreign key (provider_id) references animal_category (id),
    constraint FKdjn9tw74nwr1qx2xrrvtf3iak
        foreign key (consumer_id) references board (id)
);
-- auto-generated definition
create table board_media
(
    media_index int                     not null,
    board_id    bigint                  not null,
    id          bigint auto_increment
        primary key,
    media_type  varchar(32) not null,
    media_url   varchar(255)            not null,
    constraint FKf8tyql3th2klhxwlfi1nn5a3f
        foreign key (board_id) references board (id)
);
-- auto-generated definition
create table comment
(
    board_id   bigint      not null,
    created_at datetime(6) not null,
    deleted_at datetime(6) null,
    id         bigint auto_increment
        primary key,
    member_id  bigint      not null,
    constraint FKlij9oor1nav89jeat35s6kbp1
        foreign key (board_id) references board (id),
    constraint FKmrrrpi513ssu63i2783jyiv9m
        foreign key (member_id) references member (id)
);
-- auto-generated definition
create table follow
(
    followed_at      datetime(6) not null,
    member_id        bigint      not null,
    target_member_id bigint      not null,
    primary key (member_id, target_member_id),
    constraint FKbv9fpsq0i3foaq6800gwday36
        foreign key (target_member_id) references member (id),
    constraint FKla8lvflaauks5sw7s0u44q6x0
        foreign key (member_id) references member (id)
);
-- auto-generated definition
create table member_category_filter
(
    consumer_id bigint not null,
    provider_id bigint not null,
    primary key (consumer_id, provider_id),
    constraint FKdb9dep6tmiym2lsnf06wk6ewc
        foreign key (provider_id) references animal_category (id),
    constraint FKdre5ucs11eliv4gg0ifp3vcyu
        foreign key (consumer_id) references member (id)
);
-- auto-generated definition
create table reaction
(
    board_id      bigint                not null,
    created_at    datetime(6)           not null,
    id            bigint auto_increment
        primary key,
    member_id     bigint                not null,
    reaction_type varchar(32) not null,
    constraint FK7bug6mxn1l3mq8wj67f9jxfv8
        foreign key (board_id) references board (id),
    constraint FKf0kgc48u5e6wakvieex07kk5w
        foreign key (member_id) references member (id)
);
-- auto-generated definition
create table report
(
    board_id           bigint                                                                                                                 not null,
    comment_id         bigint                                                                                                                 not null,
    created_at         datetime(6)                                                                                                            not null,
    id                 bigint auto_increment
        primary key,
    member_id          bigint                                                                                                                 not null,
    reported_member_id bigint                                                                                                                 not null,
    reason             varchar(32) not null,
    content            varchar(255)                                                                                                           null,
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
    board_id   bigint      not null,
    created_at datetime(6) not null,
    id         bigint auto_increment
        primary key,
    member_id  bigint      not null,
    constraint FK46d2cvrgggcia4oean5lykfr
        foreign key (board_id) references board (id),
    constraint FKq0ff1jblgu8vrsh90u826qell
        foreign key (member_id) references member (id)
);

INSERT INTO member
(oauth_type, oauth_id, oauth_name, country, language, profile_image_url, nickname, nickname_updated_at, statement, role, created_at, deleted_at)
VALUES
    ('OAUTH_TYPE1', 'OAUTH_ID1', 'OAUTH_NAME1', 'COUNTRY1', 'LANGUAGE1', 'PROFILE_IMAGE_URL1', 'NICKNAME1', '2023-01-01 00:00:00', 'STATEMENT1', 'MEMBERROLE1', '2023-01-01 00:00:00', NULL),
    ('OAUTH_TYPE2', 'OAUTH_ID2', 'OAUTH_NAME2', 'COUNTRY2', 'LANGUAGE2', 'PROFILE_IMAGE_URL2', 'NICKNAME2', '2023-02-01 00:00:00', 'STATEMENT2', 'MEMBERROLE2', '2023-02-01 00:00:00', NULL),
    ('OAUTH_TYPE3', 'OAUTH_ID3', 'OAUTH_NAME3', 'COUNTRY3', 'LANGUAGE3', 'PROFILE_IMAGE_URL3', 'NICKNAME3', '2023-03-01 00:00:00', 'STATEMENT3', 'MEMBERROLE3', '2023-03-01 00:00:00', NULL);