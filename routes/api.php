<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RegistrasiController;

Route::get('/registrasi', [RegistrasiController::class, 'index']);
Route::post('/registrasi', [RegistrasiController::class, 'store']);
Route::get('/registrasi/{registrasi}', [RegistrasiController::class, 'show']);
Route::put('/registrasi/{registrasi}', [RegistrasiController::class, 'update']);
Route::delete('/registrasi/{registrasi}', [RegistrasiController::class, 'destroy']);

