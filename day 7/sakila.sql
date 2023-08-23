-- Go to https://dev.mysql.com/doc/index-other.html and download sakila db. Extract and import sakila data into your MySQL.
-- Show all data using IN, and display the country_id and country columns of the following countries: China, Bangladesh, and India
-- Find every actors whose last names contain the letters OD. Order the rows by last name and first name, in that order
-- Modify table actors. Add a middle_name column to the table actor. Position it between first_name and last_name. Hint: you will need to specify the data type.
-- List every last names of actors and the number of actors who have that last name, but only for names that are shared by at least two actors
-- Join the table and display the first and last names, as well as the address, of each staff member.


use sakila;

select country_id,country from country where country in ('China','Bangladesh','India');

select * from actor where last_name like '%od%' order by last_name,first_name;

select * from actor;
alter table actor add middle_name varchar(255) after first_name;

select last_name,count(last_name) from actor group by last_name having count(last_name) >=2; 

select first_name,last_name,address from staff c
join address ad on ad.address_id = c.address_id;

-- Find out how many copies of the film “Hunchback Impossible” exist in the inventory system
-- Find and display the most frequently rented movies in descending order.
-- Write down a query in order to display each store its store ID, city, and country
-- Use subqueries to display every actors who appear in the film Alone Trip.
-- Delete the middle_name column from table actors


select count(*) copies from inventory i 
join film f on f.film_id = i.film_id
where f.title = 'Hunchback Impossible';

select f.title from rental r 
join inventory i on i.inventory_id = r.inventory_id 
join film f on f.film_id = i.film_id 
group by f.title 
order by count(f.title) desc;

select s.store_id,city,country from store s
join address a on a.address_id = s.address_id
join city ct on ct.city_id = a.city_id
join country c on c.country_id = ct.country_id;

select * from actor a
join film_actor fa on fa.actor_id = a.actor_id
where film_id = (select film_id from film where title = 'Alone Trip');

alter table actor drop column middle_name;

