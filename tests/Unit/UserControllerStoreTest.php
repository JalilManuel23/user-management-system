<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\User;
use Illuminate\Validation\ValidationException;

use Illuminate\Database\QueryException;

class UserControllerStoreTest extends TestCase
{
    /**
     * Test the creation of a user.
     *
     * Test creating a user with valid data and ensure it is created
     * successfully and data matches.
     *
     * @return void
     */
    public function test_it_can_create_user()
    {
        // Valid data for user creation
        $userData = [
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'password' => 'secret',
        ];

        // Create the user
        $user = User::create($userData);

        // Ensure user is created successfully
        $this->assertInstanceOf(User::class, $user);
        $this->assertEquals($userData['name'], $user->name);
        $this->assertEquals($userData['email'], $user->email);
    }


    /**
     * Test that the system cannot create a user with invalid data.
     *
     * Test attempting to create a user with invalid data and ensures
     * that it does not get created, triggering a QueryException.
     *
     * @return void
     */
    public function test_it_cannot_create_user_with_invalid_data()
    {
        // Invalid data for user creation (missing email)
        $invalidUserData = [
            'name' => 'John Doe',
            'password' => 'secret',
        ];

        // Trying to create the user with invalid data should throw a QueryException
        $this->expectException(QueryException::class);

        // Create the user with invalid data
        User::create($invalidUserData);
    }

}
