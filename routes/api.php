<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use Illuminate\Support\Facades\Route;

// Protected API routes - require authentication
Route::middleware('auth:sanctum')->group(function () {
    // Add your protected API endpoints here
    // Example: Route::get('/posts', [PostController::class, 'index']);
});


