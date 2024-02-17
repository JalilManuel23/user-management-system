<h1 align="center" id="title">User Management System</h1>
<p align="center">
<img src="https://socialify.git.ci/JalilManuel23/user-management-system/image?description=1&amp;descriptionEditable=Users%20CRUD&amp;font=Inter&amp;language=1&amp;name=1&amp;owner=1&amp;pattern=Signal&amp;stargazers=1&amp;theme=Light" alt="project-image"></p>
<p id="description">A web application that enables CRUD operations for user management. It includes user authentication an admin dashboard for managing users CRUD functionality for creating reading updating and deleting user data.</p>

## Table of Contents

1. [Installation Steps](#installation-steps)
2. [Testing](#testing)

## Installation Steps:

 <p>1. Clone the repository</p>

    git clone https://github.com/JalilManuel23/user-management-system.git

 <p>2. Switch to the repository folder</p>

     cd user-management-system

 <p>3. Install dependencies using composer</p>

     composer install

  <p>4. Install dependencies using npm</p>

    npm install

  <p>5. Copy env.example to a new file named .env</p>

    cp .env.example .env

  <p>6. Generate a new application key</p>

    php artisan key:generate

  <p>7. Generate a new JWT authentication secret key</p>

       php artisan jwt:secret

   <p>8. Run the database migrations</p>

       php artisan migrate --seed

_In this step, a prompt should appear asking if you want to create the database. Select **'yes'.** In the event that this prompt does not appear, a file named **'database/database.sqlite'** should be created._

   <p>9. Start the local development server</p>

    php artisan serve

   <p>10. Start the local development server</p>

      npm run dev

   <p>11. You can now access the server at [http://localhost:8000](http://127.0.0.1:8000)</p>

## Testing

<p>Before running the tests, make sure you are in the root directory of your Laravel project. To run the tests, you can use either of the following commands in your terminal:</p>

    php artisan test

 <p>or</p>

    vendor/bin/phpunit
