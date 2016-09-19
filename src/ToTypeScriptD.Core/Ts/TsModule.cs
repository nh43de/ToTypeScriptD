﻿using System.Collections.Generic;

namespace ToTypeScriptD.Core.Ts
{
    public class TsModule
    {
        public string Name { get; set; }

        public ICollection<TsNamespace> Namespaces { get; set; } = new List<TsNamespace>();

        public ICollection<TsType> TypeDeclarations { get; set; } = new List<TsType>();

        public ICollection<TsFunction> FunctionDeclarations { get; set; } = new List<TsFunction>();


        public override string ToString()
        {
            return Name;
        }
    }
}
