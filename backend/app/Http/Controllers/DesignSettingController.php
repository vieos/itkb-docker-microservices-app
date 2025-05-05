<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\DesignSetting;

class DesignSettingController extends Controller
{
    public function index()
    {
        $settings = DesignSetting::all()->pluck('value', 'key');
        return response()->json($settings);
    }

    public function update(Request $request)
    {
        $data = $request->all();

        foreach ($data as $key => $value) {
            DesignSetting::updateOrCreate(
                ['key' => $key],
                ['value' => $value]
            );
        }

        return response()->json(['message' => 'Design settings updated successfully']);
    }
}
