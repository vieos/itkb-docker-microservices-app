<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('username')->unique();
            $table->string('password');
            $table->boolean('is_admin')->default(false);
            $table->boolean('ldap_enabled')->default(false);
            $table->string('ldap_server_ip')->nullable();
            $table->timestamps();
        });

        // Insert default admin user
        DB::table('users')->insert([
            'username' => 'admin',
            'password' => bcrypt('admin'),
            'is_admin' => true,
            'ldap_enabled' => false,
            'ldap_server_ip' => null,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }

    public function down()
    {
        Schema::dropIfExists('users');
    }
}
