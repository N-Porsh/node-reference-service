begin;

create table if not exists public.example_table (
    id bigserial not null primary key,
    text varchar(258)
);

/* For example purpose. :) */

TRUNCATE public.example_table CASCADE;

insert into public.example_table (text) values 
	('Hello World 1'),
	('Hello World 2');

commit;