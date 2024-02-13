<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Hash;

class UserTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Get the JWT token for the given user.
     *
     * @param  \App\Models\User  $user
     * @return string
     */
    protected function getToken(User $user)
    {
        return JWTAuth::fromUser($user);
    }

    /**
     * Test if it can return users.
     *
     * @return void
     */
    public function test_it_can_return_users()
    {
        $user = User::factory()->create();
        $token = $this->getToken($user);

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)->getJson('/api/user');

        $response->assertStatus(200)
            ->assertJsonStructure([
                'users' => [],
            ]);
    }

    /**
     * Test if it can create a user.
     *
     * @return void
     */
    public function test_it_can_create_user()
    {
        $user = User::factory()->create();
        $token = $this->getToken($user);

        $newUser = [
            'email' => 'newuser@mail.com',
            'name' => 'New User',
            'password' => 'password'
        ];

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->postJson('/api/user', $newUser );

        $response->assertStatus(201)
            ->assertJsonStructure([
                'user' => [],
            ]);
    }

    /**
     * Test if it can show a user.
     *
     * @return void
     */
    public function test_it_can_show_user()
    {
        $user = User::factory()->create();
        $token = $this->getToken($user);

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->getJson('/api/user/'.$user->id);

        $response->assertStatus(200)
            ->assertJsonStructure([
                'user' => [],
            ]);
    }

    /**
     * Test if it can update a user.
     *
     * @return void
     */
    public function test_it_can_update_user()
    {
        $user = User::factory()->create();
        $token = $this->getToken($user);
        $newName = 'New Name';

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->putJson('/api/user/'.$user->id, [
                'name' => $newName,
            ]);

        $response->assertStatus(200)
            ->assertJsonFragment([
                'name' => $newName,
            ]);
    }

    /**
     * Test if it can delete a user.
     *
     * @return void
     */
    public function test_it_can_delete_user()
    {
        $user = User::factory()->create();
        $token = $this->getToken($user);

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->deleteJson('/api/user/'.$user->id);

        $response->assertStatus(200)
            ->assertJson([
                'message' => 'User deleted successfully',
            ]);

        $this->assertDatabaseMissing('users', ['id' => $user->id]);
    }
}
