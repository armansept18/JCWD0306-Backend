-- Add new actor into table actors with name JHONNY DAVIS.
-- There are several new actor to add. Add new actor into table actors with name ADAM DAVIS, JEREMY DAVIS, CRAIG DAVIS, STEVE DAVIS in a single query.
-- Count how many actors with last name DAVIS.
-- Delete actor with last name DAVIS and first name JENNIFER.
-- Update actor with last name DAVIS and change his/her first name into GEORGE
-- Find top 10 actor with the most perform on film.
-- Display title, description, length, and rating from film, where special features include deleted scenes and behind the scenes order by most length
-- Display country and total of inactive customer (active = 0) from country where customer active = 0 order by the highest inactive (active = 0) customer

use sakila;
select * from actor;
insert into actor (first_name,last_name,last_update) values ('JHONNY','DAVIS',CURDATE());
insert into actor (first_name,last_name,last_update) values ('ADAM','DAVIS',CURDATE()),('JEREMY','DAVIS',CURDATE()),('CRAIG','DAVIS',CURDATE()),('STEVE','DAVIS',CURDATE());

SELECT COUNT(*) from actor where last_name = 'davis';
select * from actor where last_name = 'davis';
SET SQL_SAFE_UPDATES = 0; -- disbaled safe updates
delete from actor where first_name = 'JENNIFER' and last_name = 'davis';
delete from film_actor where actor_id = 4;

update actor set first_name = 'GEORGE' where last_name = 'davis';
select * from film;
select title,description,length,rating from film where special_features like '%Deleted Scenes,Behind the Scenes%' order by length desc;
select c.country,count(cm.active) inactive_customer  from country c
join city ct on ct.country_id = c.country_id
join address a on a.city_id = ct.city_id
join customer cm on cm.address_id = a.address_id 
where cm.active = 0 group by c.country order by count(cm.active) desc;
 
 