CREATE TABLE users (
	user_id SERIAL PRIMARY KEY NOT NULL,
	email VARCHAR(100) UNIQUE,
	password VARCHAR(100),
	date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  phone_number VARCHAR(100),
	user_name VARCHAR(100),
	farm_name VARCHAR(100),
	farm_address VARCHAR(200),
	farm_city VARCHAR(100),
	farm_state VARCHAR(2),
	farm_zip INT
);

CREATE TABLE suppliers (
	supplier_id SERIAL PRIMARY KEY NOT NULL,
	name VARCHAR(100),
	date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	website VARCHAR(200),
	phone_number VARCHAR(100),
	address VARCHAR(200),
	city VARCHAR(100),
	state VARCHAR(2),
	zip INT,
	description TEXT,
	active BOOLEAN DEFAULT true,
	user_id INT REFERENCES users (user_id)
);

CREATE TABLE seeds (
	seed_id SERIAL PRIMARY KEY NOT NULL,
	crop VARCHAR(100),
	date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	variety VARCHAR(100),
	purchase_date TIMESTAMP,
	lot_number VARCHAR(100),
	quantity REAL,
	out_of_stock BOOLEAN DEFAULT false,
	item_code VARCHAR(100),
	supplier_id INT REFERENCES suppliers (supplier_id),
	organic BOOLEAN DEFAULT false,
	untreated BOOLEAN DEFAULT false,
	non_gmo BOOLEAN DEFAULT false,
	seed_check_sources TEXT,
	receipt_url TEXT,
	user_id INT REFERENCES users (user_id)
);

CREATE TABLE planted (
	planted_id SERIAL PRIMARY KEY NOT NULL,
	seed_id INT REFERENCES seeds (seed_id),
	date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	location TEXT,
	date_planted TIMESTAMP,
	quantity REAL,
	area_sqft REAL,
	notes TEXT,
	harvest_complete BOOLEAN DEFAULT false,
	harvest_complete_date TIMESTAMP,
	user_id INT REFERENCES users (user_id)
);

CREATE TABLE harvested (
	harvested_id SERIAL PRIMARY KEY NOT NULL,
	plant_id INT REFERENCES planted (planted_id),
	date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	location TEXT,
	date_harvested TIMESTAMP,
	yield REAL,
	area_sqft REAL,
	notes TEXT,
	sold_out BOOLEAN DEFAULT false,
	user_id INT REFERENCES users (user_id)
);

CREATE TABLE sold (
	sold_id SERIAL PRIMARY KEY NOT NULL,
	harvest_id INT REFERENCES harvested (harvested_id),
	date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	date_sold TIMESTAMP,
	weight_sold REAL,
	sold_to TEXT,
	notes TEXT,
	user_id INT REFERENCES users (user_id)
);
