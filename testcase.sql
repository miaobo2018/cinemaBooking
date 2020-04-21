use testmysqldb;

-- 第一次查找：通过film name 查到有几个screening对应 （film 和 screening 要inner join）
select screeningId from testscreening s, testfilm f
where s.sfilmId = f.filmId and f.filmName = 'Harry Potter';

-- 第二次查找：用户要选择一个screening 这个screening对应1个room 
select roomNum from testroom r, testscreening s
where r.roomNum = s.sroomId and s.screeningId = 1;

-- 第三次查找：用户根据该room 和 available 查找available=0的seat的row和col
select rowNum, colNum from testseat where sroomNum = 1 and available = 0;