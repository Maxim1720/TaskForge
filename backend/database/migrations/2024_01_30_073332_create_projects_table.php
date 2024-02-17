<?php

use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string("name")->nullable(false);
            $table->text("description")->nullable(false);
            $table->dateTime("expiry_at")->nullable();
            $table->boolean("is_public")->nullable(false);
            $table->foreignId("user_id")->constrained("users", "id")
                ->onDelete("cascade");

        });
        //073332
        //094150

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
