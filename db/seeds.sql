USE burgers_db_2;

INSERT INTO Burgers (burger_name, devoured, createdAt, updatedAt)
	VALUES ('Plain Cheese Burger', false, current_timestamp(), current_timestamp());
INSERT INTO Burgers (burger_name, devoured, date)
	VALUES ('Wendys Bacon Cheeseburger', false);
INSERT INTO Burgers (burger_name, devoured, date)
	VALUES ('BK Baconator', false);