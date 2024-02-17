<?php

namespace App\Service;

class ArrayKeysTransformator
{


    public static function removeUnderscores(array $associativeArr): array
    {
        $newArr = array();
        foreach ($associativeArr as $key => $value) {
            $keyParts = explode("_", $key);
            $newKey = $key;
            if (count($keyParts) > 1) {
                $newKey = array();
                $newKey[] = $keyParts[0];
                foreach (array_slice($keyParts, 1) as $part) {
                    $newKey[] = self::capitalize($part);
                }
                $newKey = join("", $newKey);
            }
            $newArr[$newKey] = $value;
        }
        return $newArr;
    }

    public static function toWithUnderscores(array $arr): array
    {
        $newArr = [];
        foreach ($arr as $key => $value) {
            $keyLetters = str_split($key);
            $newKey = [];
            foreach ($keyLetters as $letter) {
                if (ctype_upper($letter)) {
                    $newKey[] = "_";
                    $newKey[] = strtolower($letter);
                } else {
                    $newKey[] = $letter;
                }
            }
            $newKey = join("", $newKey);
            $newArr[$newKey] = $value;
        }
        return $newArr;
    }

    private static function capitalize(string $str): string
    {
        return strtoupper(substr($str, 0, 1)) . substr($str, 1);
    }
}
