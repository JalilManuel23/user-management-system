<?php
use Tests\TestCase;
use App\Models\User;

class UserControllerDestroyTest extends TestCase
{
    /**
     * Test that the system can destroy a user.
     *
     * @return void
     */
    public function test_it_can_destroy_user()
    {
        // Create a user
        $user = User::factory()->create();

        // Call the method to destroy the user
        $destroyed = $user->delete();

        // Ensure the user is destroyed successfully
        $this->assertTrue($destroyed);
        $this->assertDatabaseMissing('users', ['id' => $user->id]);
    }

    /**
     * Test that an ID is required to destroy a user.
     *
     * @return void
     */
    public function test_it_requires_id_to_destroy_user()
    {
        $user = new User();

        // Call the method to destroy the user without providing an ID
        $destroyed = $user->delete();

        // Ensure the user is not destroyed (expects false)
        $this->assertNull($destroyed);
    }
}
