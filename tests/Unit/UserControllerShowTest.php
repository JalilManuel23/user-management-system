<?php
use Tests\TestCase;
use App\Models\User;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class UserControllerShowTest extends TestCase
{
    /**
     * Test that the system can show all users.
     *
     * @return void
     */
    public function test_it_can_show_all_users()
    {
        // Create three users
        $users = User::factory()->count(3)->create();

        // Call the method to show all users
        $allUsers = User::all();

        // Ensure all users are retrieved successfully
        $this->assertEquals(3, $allUsers->count());
        $this->assertInstanceOf(User::class, $allUsers->first());
    }

    /**
     * Test that the system can show a specific user.
     *
     * @return void
     */
    public function test_it_can_show_user()
    {
        // Create a user
        $user = User::factory()->create();

        // Call the method to show the user
        $foundUser = User::findOrFail($user->id);

        // Ensure the user is found successfully
        $this->assertInstanceOf(User::class, $foundUser);
        $this->assertEquals($user->id, $foundUser->id);
    }

    /**
     * Test that attempting to show a non-existent user throws an exception.
     *
     * @return void
     */
    public function test_it_throws_exception_for_nonexistent_user()
    {
        // Attempt to find a user that doesn't exist
        $this->expectException(ModelNotFoundException::class);
        User::findOrFail(9999); // Assuming ID 9999 does not exist
    }
}
