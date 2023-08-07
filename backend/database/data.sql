-- auto-generated definition
create table animal_category
(
    id      bigint auto_increment
        primary key,
    species enum ('AMPHIBIAN', 'BIRD', 'CAT', 'DOG', 'ETC', 'FISH', 'INSECT', 'REPTILE', 'SMALL_ANIMAL') not null
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
    content       varchar(255)               not null,
    visible_scope enum ('BLINDED', 'PUBLIC') not null,
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
create table member
(
    created_at          datetime(6)                                                                                                                                                                                                                                                                                                                                not null,
    deleted_at          datetime(6)                                                                                                                                                                                                                                                                                                                                null,
    id                  bigint auto_increment
        primary key,
    nickname_updated_at datetime(6)                                                                                                                                                                                                                                                                                                                                not null,
    nickname            varchar(12)                                                                                                                                                                                                                                                                                                                                not null,
    statement           varchar(30)                                                                                                                                                                                                                                                                                                                                null,
    country             enum ('ARMENIA', 'ARMENIAN', 'AUSTRALIA', 'AUSTRIA', 'BELGIUM', 'BRAZIL', 'CANADA', 'CZECH', 'ETC', 'FINLAND', 'FRANCE', 'GERMANY', 'ITALY', 'JAPAN', 'JORDAN', 'KOREA', 'LUXEMBOURG', 'MALAYSIA', 'MOROCCO', 'NETHERLANDS', 'PORTUGAL', 'ROMANIA', 'RUSSIA', 'SPAIN', 'SWITZERLAND', 'THAILAND', 'TURKEY', 'UAE', 'UK', 'UKRAINE', 'USA') not null,
    language            enum ('ENGLISH', 'FRENCH', 'GERMAN', 'ITALIAN', 'JAPANESE', 'KOREAN', 'SPANISH')                                                                                                                                                                                                                                                           not null,
    oauth_id            varchar(255)                                                                                                                                                                                                                                                                                                                               not null,
    oauth_name          varchar(255)                                                                                                                                                                                                                                                                                                                               null,
    oauth_type          enum ('FORTY_TWO', 'GOOGLE')                                                                                                                                                                                                                                                                                                               not null,
    profile_image_url   varchar(255)                                                                                                                                                                                                                                                                                                                               null,
    role                enum ('ADMIN', 'USER')                                                                                                                                                                                                                                                                                                                     not null
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
    reaction_type enum ('LIKE', 'NONE') not null,
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
    content            varchar(255)                                                                                                           null,
    reason             enum ('AD_SPAM', 'ETC', 'INAPPROPRIATE_NICKNAME', 'INSULTS', 'IRRELEVANT', 'SEXUAL_VIOLENCE', 'WRONG_ANIMAL_CATEGORY') not null,
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
