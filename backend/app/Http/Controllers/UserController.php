<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    // List all users
    public function index()
    {
        return response()->json(User::all());
    }

    // Create a new user
    public function store(Request $request)
    {
        $request->validate([
            'username' => 'required|unique:users',
            'password' => 'required',
            'is_admin' => 'boolean',
            'ldap_enabled' => 'boolean',
            'ldap_server_ip' => 'nullable|string',
        ]);

        $user = new User();
        $user->username = $request->username;
        $user->password = $request->password; // Mutator will hash
        $user->is_admin = $request->is_admin ?? false;
        $user->ldap_enabled = $request->ldap_enabled ?? false;
        $user->ldap_server_ip = $request->ldap_server_ip;
        $user->save();

        return response()->json($user, 201);
    }

    // Update user
    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        if ($request->has('username')) {
            $user->username = $request->username;
        }
        if ($request->has('password')) {
            $user->password = $request->password; // Mutator will hash
        }
        if ($request->has('is_admin')) {
            $user->is_admin = $request->is_admin;
        }
        if ($request->has('ldap_enabled')) {
            $user->ldap_enabled = $request->ldap_enabled;
        }
        if ($request->has('ldap_server_ip')) {
            $user->ldap_server_ip = $request->ldap_server_ip;
        }

        $user->save();

        return response()->json($user);
    }

    // Delete user
    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();

        return response()->json(null, 204);
    }
}
