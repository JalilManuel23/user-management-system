<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\User;
use Illuminate\Validation\ValidationException;

class UserControllerUpdateTest extends TestCase
{
    /**
     * Test that the system can update a user with valid data.
     *
     * @return void
     */
    public function test_it_can_update_user_with_valid_data()
    {
        // Create a user
        $user = User::factory()->create();

        // Updated user data
        $updatedUserData = [
            'name' => 'Updated Name',
            'email' => 'updated@example.com',
        ];

        // Call the method to update the user
        $updatedUser = $user->update($updatedUserData);

        // Ensure the user is updated successfully
        $this->assertTrue($updatedUser);
        $this->assertEquals($updatedUserData['name'], $user->fresh()->name);
        $this->assertEquals($updatedUserData['email'], $user->fresh()->email);
    }

    /**
     * Test that an ID is required to update a user.
     *
     * @return void
     */
    public function test_it_requires_id_to_update_user()
    {
        $user = new User();
        $updatedUserData = [
            'name' => 'Updated Name',
            'email' => 'updated@example.com',
        ];

        // Call the method to update the user without providing an ID
        $updatedUser = $user->update($updatedUserData);

        // Ensure the user is not updated (expects false)
        $this->assertFalse($updatedUser);
    }

}
