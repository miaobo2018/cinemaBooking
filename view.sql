-- use cinema_booking;
-- select f.filmName, se.sroomNum, se.rowNum, se.colNum from seat se, screening sc, film f
-- where f.filmId = sc.sfilmId and sc.room = se.sroomNum;

DROP VIEW IF EXISTS `film_seat`;
CREATE VIEW film_seat
AS SELECT f.filmName, se.sroomNum, se.rowNum, se.colNum 
from seat se, screening sc, film f
where f.filmId = sc.sfilmId and sc.room = se.sroomNum;

select * from film_seat where filmName = 'Big Movie';