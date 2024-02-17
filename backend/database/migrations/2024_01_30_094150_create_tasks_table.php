<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string("title")->nullable(false);
            $table->boolean("done")->nullable(false);

            $table->foreignId("project_id")
                ->constrained("projects", "id");
//            $table->unsignedBigInteger("project_id");
            /*$table->foreign("project_id")
                ->references("id")
                ->on("projects")
                ->onDelete("cascade");*/
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};
