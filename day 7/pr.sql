-- Exercise
-- 1.	Ada berapa region di database world? Ubah headernya menjadi 'Jumlah_Region'!
-- 2.	Ada berapa negara di Africa? Ubah headernya menjadi 'Jumlah_Negara'!  
-- 3.	Tampilkan 5 negara dengan populasi terbesar! Ubah headernya menjadi 'Nama_Negara' dan 'Populasi'!
-- 4.	Tampilkan rata-rata harapan hidup tiap benua dan urutkan dari yang terendah! Ubah headernya menjadi 'Nama_Benua' dan 'Rata_Rata_Harapan_Hidup'!
-- 5.	Tampilkan Jumlah region tiap benua dengan jumlah region lebih dari 3! Ubah headernya menjadi 'Nama_Benua' dan 'Jumlah_Region'!
-- 6.	Tampilkan rata-rata GNP di Afrika berdasarkan regionnya dan urutkan dari rata-rata GNP terbesar! Ubah headernya menjadi 'Nama_Region' dan 'Rata_Rata_GNP'!
-- 7.	Tampilkan negara di Eropa yang memiliki nama dimulai dari huruf I
-- 8.	Tampilkan Jumlah bahasa tiap negara! Urutkan dari yg paling banyak! Ubah headernya menjadi 'Jumlah_Bahasa'
-- 9.	Tampilkan nama negara yang panjang hurufnya 6 huruf dan berakhiran 'O'
-- 10.	Tampilkan 7 bahasa terbesar di Indonesia (secara persentase, dengan persentase yg dibulatkan)! Ubah headernya menjadi 'Bahasa' dan 'Persentase'
-- 11.	Tampilkan Continent yang memiliki GovernmentForm kurang dari 10
-- 12.	Region mana saja yg Total GNP-nya mengalami kenaikan dari Total GNP sebelumnya (GNPOld)? Urutkan dari yg tertinggi!

use world;
select count(distinct region) Jumlah_Region from country;

select continent, count(continent) Jumlah_Negara from country where continent = 'Africa' group by continent;
select Name Nama_Negara, population Populasi from country order by populasi desc;

select continent Nama_Benua,avg(lifeExpectancy) from country group by continent order by avg(lifeExpectancy) asc;

select continent Nama_Benua, count(distinct region) Jumlah_Region from country group by continent having count(distinct region) >3 ;

select region Nama_Region,avg(gnp) Rata_Rata_GNP from country group by region order by avg(gnp) desc;

select Name,continent from country where continent = 'Europe' and Name like 'i%'; 

select countrycode,count(countrycode) from country c
join countrylanguage cl on cl.Countrycode = c.code
group by countrycode 
order by count(countrycode) desc;

select Name from country where Name like '%o' and length(Name) = 6;

select countrycode,language Bahasa, round(Percentage) Persentase from country c 
join countrylanguage cl on c.code = cl.countrycode
where Name = 'Indonesia'
order by round(percentage) desc;

select continent,count(distinct GovernmentForm) many_government from country group by continent having count(distinct GovernmentForm) <10; 
select * from country;
select region, sum(gnp-gnpold) Selisih from country group by region having sum(gnp-gnpold) > 0 order by sum(gnp-gnpold) desc;

