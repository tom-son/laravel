#!/bin/bash

export DB_DATABASE="database/app_test_database.sqlite"
php artisan migrate:fresh
