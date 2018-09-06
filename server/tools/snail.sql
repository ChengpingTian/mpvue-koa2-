
CREATE TABLE books(
  id int(11) NOT NULL AUTO_INCREMENT,
  isbn varchar(20) NOT NULL,
  openid varchar(100) NOT NULL,
  title varchar(100) NOT NULL,
  image varchar(100) NOT NULL,
  alt varchar(100) NOT NULL,
  publisher varchar(100) NOT NULL,
  summary varchar(1000) NOT NULL,
  price varchar(100),
  rate float,
  tags varchar(100),
  author varchar(100),
 )

