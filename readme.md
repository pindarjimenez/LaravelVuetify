# Guest Booking

Guest Booking application

## Requirements
* PHP >= 7.1.3
* Composer
* Nodejs >= 9.11.1

## Installation

### Step 1:

Clone the project below:

```
# Using ssh
git clone git@github.com:akoCpindar/LaravelVuetify.git
```
Or
```
# Using https
git clone https://github.com/akoCpindar/LaravelVuetify.git
```

### Step 2:

Install all the dependencies by executing below commands:

```
composer install
```

And

```
npm install
```

Make sure .env file is modified for mysql connection

```
# MySQL host in .env file should be modified so that you can utilize mysql
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=guest_booking
DB_USERNAME=root
DB_PASSWORD=
```

## Usage
So doing that just execute below in your project directory

```
# You can execute npm run watch so that you don't need to re-execute npm run dev
npm run watch
```

```
Run migration file after creating database
php artisan migrate

If cannot detect the database run
php artisan config:cache
```

### Visit
```
http://localhost
```

or

```
http://localhost:3000
```

## License
Copyright © 2019, [Pindar_Jimenez]
