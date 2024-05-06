 create table events(
        id serial not null,
        name text,
        description text,
        date integer,
        reward_per_sell integer);

create table influencers(
 id serial not null,
 name text,
 password text,
 email text unique,
 wallet_id text unique,
 wallet_address text unique,
 referral_code text unique);
