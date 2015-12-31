﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using ToTypeScriptD.Core.Config;
using ToTypeScriptD.Core.Extensions;
using ToTypeScriptD.Lexical.DotNet;
using ToTypeScriptD.Lexical.Extensions;
using ToTypeScriptD.Lexical.TypeWriters;
using ToTypeScriptD.Lexical.WinMD;

namespace ToTypeScriptD.Core
{
    public class Render
    {
        public static void FromAssemblies(ICollection<string> assemblyPaths, ConfigBase config, TextWriter w)
        {
            w.Write(GetHeader(assemblyPaths, config.IncludeSpecialTypes));

            var allAssemblyTypes = assemblyPaths.SelectMany(GetAssemblyTypes).ToArray();

            FromTypes(allAssemblyTypes, w, config);
        }

        public static void FromAssembly(string assemblyPath, ConfigBase config, TextWriter w)
        {
            w.Write(GetHeader(new[] { assemblyPath }, config.IncludeSpecialTypes));

            var allAssemblyTypes = GetAssemblyTypes(assemblyPath);

            FromTypes(allAssemblyTypes, w, config);
        }

        public static void FromTypes(ICollection<Type> types, TextWriter w, ConfigBase config)
        {
            var namespaces = types.Select(t => t.Namespace).Distinct();
            
            //TODO: make dynamic
            var selector = new DotNetTypeWriterTypeSelector();

            foreach (var ns in namespaces)
            {
                //TS modules are namespaces
                w.Write($@"declare module {ns}");
                w.WriteLine();
                w.Write("{");
                w.WriteLine();
                w.WriteLine();

                foreach (var type in types.Where(t => t.Namespace == ns && t.IsNested == false).OrderBy(t => t.Name))
                {
                    //type.Value is the TypeWriter instance to uses
                    RenderType(type, selector, config, w);
                    w.WriteLine();
                }

                w.WriteLine("}");
            }
        }

        public static void RenderDotNetType(Type type, ConfigBase config, TextWriter w)
        {
            RenderType(type, new DotNetTypeWriterTypeSelector(), config, w);
        }
        public static void RenderWinMdType(Type type, ConfigBase config, TextWriter w)
        {
            RenderType(type, new WinMDTypeWriterTypeSelector(), config, w);
        }

        public static void RenderType(Type type, ITypeWriterTypeSelector selector, ConfigBase config, TextWriter w)
        {
            //TODO: really hacky
            var sb = new StringBuilder();
            selector.PickTypeWriter(type, 0, config).Write(sb);
            w.Write(sb.ToString());
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

        private static Type[] GetAssemblyTypes(string assemblyPath)
        {
            var assembly = Assembly.LoadFile(new System.IO.FileInfo(assemblyPath).FullName);

            return assembly.ManifestModule.GetTypes();
        }

    }
}
