use world;

select * from country;
select * from city;
select * from countrylanguage;

select * from country c
right join city ct on ct.CountryCode = c.code and ct.District = 'Kabol';

select country.code, countrylanguage.CountryCode, country.Name,Continent,Region, city.Name as 'City Name', District, Language from country 
right join countrylanguage on countrylanguage.CountryCode = 10
join city on city.CountryCode = country.code;

select * from countrylanguage cl 
right join country c on c.code = 10
left join city ct on ct.CountryCode = cl.CountryCode;
-- memunculkan seluruh data country dan country yang codenya 10(bersinggungan dengan cl) 

select * from countrylanguage cl 
left join country c on c.code = 10
join city ct on ct.CountryCode = cl.CountryCode;
-- memunculkan seluruh data country language dan country yg codenya 10 (bersinggungan dengan cl)


-- country + countrylang yang country code  =10

select * from country c
right join city ct on ct.CountryCode = c.code and ct.Name = 'Kabul'
union
select * from country c
left join city ct on ct.CountryCode = c.code and ct.Name = 'Kabul' 
order by code;

-- left artinya seluruh country + city yang name = kabul 
-- right artinya seluruh city + country yang ctnamenya = kabul 
-- inner semua city+country yang ctnamenya kabul

select * from country 
cross join city;


select 1 nomor, 'makan nasi goreng' hobby
union 
select 2 nomor , 'makan cabe' hobby;

select 1 nomor, 'makan nasi goreng' hobby
union 
select 1 nomor , 'makan nasi goreng' hobby;

select 1 nomor, 'makan nasi goreng' hobby
union all
select 1 nomor , 'makan nasi goreng' hobby;

select *, 123 hello from country 
order by Code;

select * from country 
union
select * from country 
order by code;




select * from country c
right join city ct on ct.CountryCode = c.code and ct.Name = 'Kabul' -- seluruh city + country yang kotanya kabul (100) 99 yang countrynya null
union all
select * from country c
left join city ct on ct.CountryCode = c.code and ct.Name = 'Kabul' -- seluruh country + city yang kotanya kabul (100) 99 yang citynya null
order by Code;
-- 100 +100 - 1 kabul karena kabulnya ada 2; => 199
-- 100 + 100 => 200. kabulnya muncul 2x 

-- sub query merupakan sebuah query di dalam query => return data
select * from city;
select * from city where CountryCode in (select code from country where code = 'AFG' or code = 'ABW');
select * from city where CountryCode = (select code from country where code = 'AFG' or code = 'ABW' LIMIT 1);

select * from country c 
join (select Name city_name, CountryCode sukasukague from city) sq on sq.sukasukague = c.code;

select * from 
(
select c.Name, ct.Name as City_Name from country c 
join city ct on ct.CountryCode = c.code) this;

select code from country where code = 'AFG' or code = 'ABW';

select *, (select Name from country where code = c.code ) country_sq from country c;
select Name from country where code = 'ABW';
select * from country;

select * from country where code in (select code from country where code = 'AFG' OR code =  'ABW');
select * from country where code = (select code from country where code = 'AFG' or code =  'ABW' limit 1);

(select * from country);

-- sub query wajib return 1 row kecuali dalam join/in

select * from country where code in ('ABW','AFG');
select * from country where code = 'ABW' or code = 'AFG';

SELECT * FROM COUNTRY where population between 50 and 1000;

start transaction;
select * from city;
delete from city where id  = 5;
rollback;
commit;


select count(kasus_country),kasus_country from 
(
select 
case when country = 'Afghanistan' then 'AFG nih'
else 'bukan afg' end as kasus_country
 from country ) this group by kasus_country;
 
 
 

 