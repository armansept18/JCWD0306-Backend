-- Display the first and last names of all actors from the table actor.
-- You need to find the ID number, first name, and last name of an actor, of whom you know only the first name, "Joe." What is one query would you use to obtain this information?
-- Display the address, district, and city_id from address only for district: California, Alberta and Mekka
-- Count actor with last name WOOD from table actors.
-- Shows list of customer_id and sum of amount spent that made payment more than 20.

use sakila;
select first_name,last_name from actor;
select actor_id,first_name,last_name from actor where first_name = 'Joe';
select address,district,city_id from address where district in ('california','alberta','mekka');
select count(*) from actor where last_name = 'wood';
select  customer_id, sum(amount) from payment group by customer_id having sum(amount) > 20;

select actor_id from actor where first_name  = 'joe'; -- => filter => tampilkan
select actor_id from actor having first_name  = 'joe'; -- => tampilkan => filter


select address,district,city_id  from address where district = 'california' or district = 'alberta' or district = 'mekka';
select * from address where district <> 'Alberta'; 