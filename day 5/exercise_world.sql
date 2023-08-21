-- Go to https://dev.mysql.com/doc/index-other.html and download world db. Extract and import world data into your MySQL.
-- Find country name with most population from table country
-- Find the second one country with most population from table country
-- Find country name with lowest population from table country
-- Find the third one country with lowest population from table country
-- Find the largest continent by sum surface area with life expectancy more than 75

use world;

select Name from country order by population desc limit 1;

select Name from country order by population desc limit 1 offset 1;

select Name from country order by population,name asc limit 1;

select Name,population from country order by population,code asc limit 1 offset 2;

select continent,sum(surfaceArea) sum_surface from country where LifeExpectancy > 75 group by continent limit 1  ;

select * from country order by population asc;