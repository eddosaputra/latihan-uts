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

        registrasi::create($request->all());

        return redirect()->route('registrasi.index')
            ->with('success', 'Registrasi berhasil ditambahkan.');
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
    public function update(Request $request, registrasi $registrasi)
    {
        $request->validate([
            'participant_name' => 'required',
            'event_name' => 'required',
            'event_date' => 'required',
            'registration_number' => 'required',
            'category' => 'required',
        ]);

        $registrasi->update($request->all());

        return redirect()->route('api.index')
            ->with('success', 'Registrasi berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(registrasi $registrasi)
    {
        $registrasi->delete();

        return redirect()->route('registrasi.index')
            ->with('success', 'Registrasi berhasil dihapus.');
    }
}
