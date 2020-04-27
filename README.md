# cinemaBooking

### 2020-04-20
use init.sql to initialize the database;
use testcase.sql to test the db (not necessary);
book seat -> according to the roomNum, rowNum, colNum -> update available

### 2020-04-14 Bo 测试无误
注意需新建两个 sql 表格 如下，同时注意更改为本地用户与密码
主要实现功能: signup login admin->addfilm user->searchfilm
sql 异步问题必须注意

```sql
use testmysqldb;

CREATE TABLE testuser (
id integer not null,
email varchar(255) not null,
password varchar(255) not null,
type varchar(255),
name varchar(255),
cellphone varchar(255),
favouriteType varchar(255),
primary key (email)
);
```
```sql
CREATE TABLE testfilm (
filmId integer not null,
filmName varchar(255),
type varchar(255),
length integer,
primary key (filmId)
);
```

### 2020-04-23

#### 前端逻辑是把index主页作为一个容器，然后每需要一个功能，就把这个功能的模块载入index中，例如需要login的话，就载入 <%- include("login.ejs"), 需要后端写入的代码已经在各个controller里面的每个函数中以注释的形式标出，比如：

```javascript
exports.deletemovieCRUD = function () {
    return function (req, res) {
        var movieName = req.body.movie;

        /**
         * 需要后端根据movieName删除该电影
         */


            res.location("showmovie");
            res.redirect("showmovie");
        }

};
```

|         已经实现的界面         | 普通用户 | 管理员 |
| :----------------------------: | :------: | :----: |
|           登录、注册           |    √     |   √    |
|          更改用户信息          |    √     |   √    |
|           预定电影票           |    √     |        |
| 查询、更改、删除、编辑所有电影 |          |   √    |
| 查询、更改、删除、编辑所有广告 |          |   √    |
|        查询预定座位情况        |          |   √    |
|     查询所有用户、删除用户     |          |   √    |

#### 管理员暂时定为名字为 “admin”的账号。。。后续还没实现的功能包括查询电影，用户评价。。。

