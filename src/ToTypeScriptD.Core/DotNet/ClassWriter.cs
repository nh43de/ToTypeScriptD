﻿using System;
using ToTypeScriptD.Core.TypeWriters;

namespace ToTypeScriptD.Core.DotNet
{
    public class ClassWriter : TypeWriterBase
    {
        public ClassWriter(Type typeDefinition, int indentCount, TypeCollection typeCollection, DotNetConfig config)
            : base(typeDefinition, indentCount, typeCollection, config)
        {
        }

        public override void Write(System.Text.StringBuilder sb)
        {
            ++IndentCount;
            base.WriteOutMethodSignatures(sb, "interface", "extends");
        }
    }
}
