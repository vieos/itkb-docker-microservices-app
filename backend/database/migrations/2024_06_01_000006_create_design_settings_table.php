<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDesignSettingsTable extends Migration
{
    public function up()
    {
        Schema::create('design_settings', function (Blueprint $table) {
            $table->id();
            $table->string('key')->unique();
            $table->text('value')->nullable();
        });
    }

    public function down()
    {
        Schema::dropIfExists('design_settings');
    }
}
