﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using ToTypeScriptD.Core.Attributes;
using ToTypeScriptD.Core.Config;
using ToTypeScriptD.Core.Extensions;

namespace ToTypeScriptD.Lexical
{
    public class Render
    {
        public static void FromAssemblies(ICollection<string> assemblyPaths, TsdConfig config, TextWriter w)
        {
            w.Write(GetHeader(assemblyPaths, config.IncludeSpecialTypes));

            var allAssemblyTypes = assemblyPaths
                .SelectMany(p => GetAssemblyTypes(p, config.RequireTypeScriptExportAttribute))
                .ToArray();
            
            FromTypes(allAssemblyTypes, w, config);
        }

        //TODO: typescriptexport attribute - flag to do all or look for attribute? what about namespace-level exports? inherited attribute? 
        public static void FromAssembly(string assemblyPath, TsdConfig config, TextWriter w)
        {
            w.Write(GetHeader(new[] { assemblyPath }, config.IncludeSpecialTypes));

            var allAssemblyTypes = GetAssemblyTypes(assemblyPath, config.RequireTypeScriptExportAttribute).ToArray();

            FromTypes(allAssemblyTypes, w, config);
        }

        private static Type[] GetAssemblyTypes(string assemblyPath, bool useAttributeFilters)
        {
            var assembly = Assembly.LoadFrom(new System.IO.FileInfo(assemblyPath).FullName);

            try
            {
                return assembly
                    .ManifestModule
                    .GetTypes()
                    .Where(
                        t =>
                            useAttributeFilters == false ||
                            t.GetCustomAttribute(typeof (TypeScriptExportAttribute)) != null)
                    .ToArray();
            }
            catch (ReflectionTypeLoadException ex)
            {
                return ex.Types.Where(t => t != null).ToArray();
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        //TODO: option to include referenced types that are in external assemblies (or how to handle assembly not founds)
        public static void FromTypes(ICollection<Type> types, TextWriter w, TsdConfig config)
        {
            var tsWriter = new TSWriter(config, w);

            var namespaces = types.Select(t => t.Namespace).Distinct();

            var typeScanner = new DotNetTypeScanner(config);

            foreach (var ns in namespaces)
            {
                var tsModule = typeScanner.GetModule(ns,
                    types.Where(t => t.Namespace == ns && t.IsNested == false)
                        .OrderBy(t => t.Name)
                        .ToArray());

                w.Write(tsWriter.Write(tsModule) + config.NewLines(2));
            }
        }


        private static string GetHeader(IEnumerable<string> assemblyPaths, bool forceDueToSpecialType)
        {
            if (!forceDueToSpecialType && !assemblyPaths.Any())
            {
                return "";
            }

            if (!assemblyPaths.All(File.Exists))
            {
                return "";
            }

            var sb = new StringBuilder();
            sb.AppendFormatLine("//****************************************************************");
            sb.AppendFormatLine("//  Generated by:  ToTypeScriptD");
            sb.AppendFormatLine("//  Website:       http://github.com/ToTypeScriptD/ToTypeScriptD");
            sb.AppendFormatLine("//  Version:       {0}", System.Diagnostics.FileVersionInfo.GetVersionInfo(typeof(Render).Assembly.Location).ProductVersion);
            sb.AppendFormatLine("//  Date:          {0}", DateTime.Now);
            if (assemblyPaths.Any())
            {
                sb.AppendFormatLine("//");
                sb.AppendFormatLine("//  Assemblies:");
                assemblyPaths
                    .Select(System.IO.Path.GetFileName)
                    .Distinct()
                    .OrderBy(s => s)
                    .Each(path =>
                    {
                        sb.AppendFormatLine("//    {0}", System.IO.Path.GetFileName(path));
                    });
                sb.AppendFormatLine("//");
            }
            sb.AppendFormatLine("//****************************************************************");
            sb.AppendFormatLine();
            sb.AppendFormatLine();
            sb.AppendFormatLine();
            return sb.ToString();
        }



    }
}
