﻿using System.Linq;

namespace WinmdToTypeScript
{

    public static class Extensions
    {
        public static string Dup(this string value, int count)
        {
            return string.Join("", Enumerable.Range(0, count).Select(s => value));
        }

        public static string ToTypeScriptType(this Mono.Cecil.TypeReference typeReference)
        {
            return typeReference.Name;
        }
    }
}
