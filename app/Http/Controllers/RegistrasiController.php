<?php

namespace App\Http\Controllers;

use App\Models\registrasi;
use Illuminate\Http\Request;


class RegistrasiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
       $registrasis = Registrasi::all();
       return response()->json(data: [
              'message' => 'Berhasil menampilkan data',
            'data' => $registrasis
         ], status: 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
      
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'participant_name' => 'required',
            'event_name' => 'required',
            'event_date' => 'required',
            'registration_number' => 'required',
            'category' => 'required',
        ]);

        $registrasi = Registrasi::create($request->all());

        return response()->json([
            'message' => 'Registrasi berhasil ditambahkan.',
            'data' => $registrasi,
        ], 201); // Status 201 untuk Created
    }


    /**
     * Display the specified resource.
     */
    public function show(registrasi $registrasi)
    {
        return view('registrasi.show', compact('registrasi'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(registrasi $registrasi)
    {
      
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Registrasi $registrasi)
    {
        $request->validate([
            'participant_name' => 'required',
            'event_name' => 'required',
            'event_date' => 'required',
            'registration_number' => 'required',
            'category' => 'required',
        ]);

        $registrasi->update($request->all());

        return response()->json([
            'message' => 'Registrasi berhasil diperbarui.',
            'data' => $registrasi,
        ], 200); // Status 200 untuk OK
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Registrasi $registrasi)
    {
        $registrasi->delete();

        return response()->json([
            'message' => 'Registrasi berhasil dihapus.',
        ], 204); // Status 204 untuk No Content
    }
}