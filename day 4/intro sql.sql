create database db_purwadhika; -- untuk create database
show databases; -- menampilkan nama2 database
show create database db_purwadhika;
-- mysql => kumpulan database => banyak table => schema dan data

use db_purwadhika; -- menggunakan database
-- drop database db_purwadhika;  -- menghapus database

create table students(nama varchar(30), address varchar(100), mark integer); -- menciptakan table student
alter table students add id integer not null primary key auto_increment;
drop table students; -- hapus table
show tables;

insert into students(nama,address,mark) values('udin','batam',100),('ujang', 'batam',50); -- insert data ke dalam table
delete from students where id = 1; -- hapus data student id 1
delete from students; -- hapus semua data students
select * from students; -- menampilkan isi dari table students
update students set mark = 100 where id = 6; -- update data student id 6, mark menjadi 100
update students set mark = 50;
select nama,address,mark from students where id = 5; -- memunculkan data id 5 dengan kolom nama,address,mark
select distinct address,mark from students; -- menampilkan data tuple yang unique saja
select count(mark) from students; -- menghitung jumlah data yang muncul 
select count(distinct mark) from students; -- menghitung jumlah data unique yang muncul
select * from students where mark >= 50 and mark <= 90;
select * from students;
select distinctrow address from students;
select sum(mark) as sum_nilai_student from students; -- total mark seluruh student
select min(mark) as nilai_min_student from students; -- nilai minimum dari student
select max(mark) as nilai_max_student from students; -- nilai maximum dari student

-- table users => login => email dan password => select email, fullname where email = email and password = password
SET SQL_SAFE_UPDATES = 0; -- disbaled safe updates

use sakila;
select * from film;
select distinct rating, count(rating) from film group by rating;
select distinct rating, count(rating) from film  group by rating order by count(rating) asc;
select distinct rating, count(rating) from film group by rating order by count(rating) desc;
select distinct rating, count(rating) from film  group by rating having count(rating) > 200;
select rating  from film group by rating;
select distinct rating, count(rating) from film where rating = "PG" or rating = "G" group by rating;
select distinct rating, count(rating) from film  group by rating having rating = "PG";
select * from film limit 10 offset 1000;
select * from film limit 20,10; -- offset,limit

select concat(first_name, " ",last_name) fullname  from actor;

select * from film;
select * from actor;
select * from film_actor;

select f.title, concat(a.first_name,' ',a.last_name) fullname from film_actor fa
join actor a on a.actor_id = fa.actor_id
join film f on f.film_id = fa.film_id
where a.first_name = 'PENELOPe';
select * from actor where first_name like 'a';
select * from actor where first_name like '%a%'; -- semua yang ada huruf a nya
select * from actor where first_name like 'a%'; -- diawali dengan huruf a
select * from actor where first_name like '%a'; -- diakhir dengan huruf a

-- // 1000 rows => 194 =>group by 
-- // 1000rows => 1000 => group by=> where/having 
-- penggunaan where dilakukan untuk kondisi data sebelum adanya aggregate function 
-- sedangkan untuk having adalah kondisi yang diberikan setelah mendapatkan hasil dari aggregate function
-- group by 
-- having
-- order by
-- limit

