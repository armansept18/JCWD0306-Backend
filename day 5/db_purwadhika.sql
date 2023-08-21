-- Create db name as purwadhika_student, purwadhika_schedule, purwadhika_branch
-- Show list of database with name contain purwadhika.
-- Delete database purwadhika_schedule
-- Create table name as Students in purwadhika_student db, with field id, last_name, first_name, address, city. The id field should be in integer type while the rest is varchar.
-- Add email column into table Students with type varchar.
-- Add gender, batch_code, phone_number, alternative_phone_number column in single query.
-- Change alternative_phone_number column name into description with varchar type.
-- Remove column gender in table Students


create database purwadhika_students;
create database purwadhika_schedules;
create database purwadhika_branches;

show databases  like '%purwadhika%';

drop database purwadhika_schedules;

use purwadhika_students;

create table students (id integer, last_name varchar(255), first_name varchar(255), address varchar(255), city varchar(255));
alter table students add column email varchar(255);
alter table students add column( gender varchar(255), batch_code varchar(255), phone_number integer,alternative_phone_number varchar(255));
alter table students change column alternative_phone_number description varchar(255);
alter table students drop column gender;


-- Try to create table with output look like image below:
-- Change PIC name into Dono if city is BSD
-- Add another branch with branch name BLI, pic is Tono, address is Gianyar, city is Gianyar, province is Bali

use purwadhika_branches;
create table branches (id integer not null auto_increment, branch_name varchar(255), pic varchar(255), address varchar(255), city varchar(255), province varchar(255), primary key (id));
insert into branches (branch_name,pic,address,city,province) values ('BSD','THOMAS','GREEN OFFICE PARK 9', 'BSD','TANGERANG'), ('JKT', 'BUDI','MSIG TOWER','JAKARTA SELATAN', 'JAKARTA'), ('BTM','ANGEL','NONGSA','BATAM', 'KEP. RIAU');
SELECT * FROM branches;
SET SQL_SAFE_UPDATES = 0; -- disbaled safe updates
update branches set pic = 'DONO' where city = 'BSD';
insert into branches (branch_name,pic,address,city,province) values ('BLI','TONO','GIANYAR','GIANYAR','BALI');




