﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using ToTypeScriptD.Core;
using ToTypeScriptD.Lexical.Extensions;
using ToTypeScriptD.Lexical.TypeScript;
using ToTypeScriptD.Lexical.TypeScript.Abstract;
using ToTypeScriptD.Lexical.WinMD;

namespace ToTypeScriptD.Lexical
{
    /// <summary>
    /// Returns TS generation AST objects (TS* classes).
    /// </summary>
    public class DotNetTypeScanner : ITypeScanner<Type>
    {
        private readonly TsdConfig _config;

        public DotNetTypeScanner(TsdConfig config)
        {
            _config = config;
        }

        //TODO: need types external to assembly - and multiple files output? options?
        public virtual TSAssembly GetTSAssembly(ICollection<Type> types, string assemblyName)
        {
            var tsAssembly = new TSAssembly(assemblyName);

            foreach (var ns in types.Select(t => t.Namespace).Distinct())
            {
                 tsAssembly.Modules.Add(
                     GetModule(ns,
                        types.Where(t => t.Namespace == ns && t.IsNested == false)
                            .OrderBy(t => t.Name)
                            .ToArray()
                    )
                 );
            }

            return tsAssembly;
        }


        public virtual TSModule GetModule(string namespaceStr, ICollection<Type> types)
        {
            var tsModule = new TSModule
            {
                Namespace = namespaceStr
            };
            
            foreach (var td in types.Where(t => t.IsNested == false).OrderBy(t => t.Name))
            {
                tsModule.TypeDeclarations.Add(GetModuleDeclaration(td));
            }

            return tsModule;
        }


        public virtual TSModuleTypeDeclaration GetModuleDeclaration(Type td)
        {
            if (td.IsEnum)
            {
                return GetEnum(td);
            }
            else if (td.IsInterface)
            {
                return GetInterface(td);
            }
            else if (td.IsClass)
            {
                if (td.BaseType.FullName == "System.MulticastDelegate" ||
                    td.BaseType.FullName == "System.Delegate")
                {
                    //TODO: Delegate writer not implemented
                    //return new DelegateWriter(td, indentCount, config, this);
                }
                else
                {
                    return GetClass(td);
                }
            }

            return null;
        }


        public virtual TSInterface GetInterface(Type td)
        {
            var tsInterface = new TSInterface
            {
                Name = td.ToTypeScriptItemNameWinMD(),
                GenericParameters = GetGenericParameters(td),
                BaseTypes = GetExportedInterfaces(td),
                Methods = GetMethods(td),
                Fields = GetFields(td),
                Properties = GetProperties(td),
                Events = GetEvents(td)
            };
            return tsInterface;
        }


        public virtual TSClass GetClass(Type td)
        {
            var tsClass = new TSClass
            {
                Name = td.ToTypeScriptItemNameWinMD(),
                GenericParameters = GetGenericParameters(td),
                BaseTypes = GetInheritedTypesAndInterfaces(td),
                Methods = GetMethods(td),
                Fields = GetFields(td),
                Properties = GetProperties(td),
                Events = GetEvents(td),
                NestedClasses = GetNestedTypes(td) //only difference between getinterface and getclass
            };
            return tsClass;
        }


        public virtual TSEnum GetEnum(Type td)
        {
            var tsEnum = new TSEnum
            {
                Name = td.ToTypeScriptItemName()
            };

            td.GetFields().OrderBy(ob => ob.Name).For((item, i, isLast) => //.OrderBy(ob => ob.Name)
            {
                if (item.Name == "value__") return;

                tsEnum.Enums.Add(item.Name);
            });

            return tsEnum;
        }
        

        public virtual List<TSModuleTypeDeclaration> GetNestedTypes(Type td)
        {
            return
                td.GetNestedTypes()
                    .Where(type => type.IsNestedPublic)
                    .Select(GetModuleDeclaration)
                    .ToList();
        } 


        public virtual List<TSGenericParameter> GetGenericParameters(Type td)
        {
            var tsTypes = new List<TSGenericParameter>();

            //generic arguments e.g. "T"
            td.GetGenericArguments().For((genericParameter, i, isLastItem) =>
            {
                var genParameter = new TSGenericParameter(genericParameter.Name); //e.g. "T"

                //param constraints e.g. "where T : class" or "where T : ICollection<T>"
                genericParameter.GetGenericParameterConstraints().For((constraint, j, isLastItemJ) =>
                {
                    // Not sure how best to deal with multiple generic constraints (yet)
                    // For now place in a comment
                    // TODO: possible generate a new interface type that extends all of the constraints?
                    genParameter.ParameterConstraints.Add(GetType(constraint));
                });
                
                tsTypes.Add(genParameter);
            });
            
            return tsTypes;
        }

        public virtual TSType GetType(Type td)
        {
            if (td.IsGenericType)
                return new TSGenericType(td.ToTypeScriptTypeName(), td.Namespace)
                { 
                    GenericParameters = td.GetGenericArguments().Select(a => new TSType(a.ToTypeScriptTypeName(), a.Namespace)).ToArray()
                };
            else 
                return new TSType(td.ToTypeScriptTypeName(), td.Namespace);
        }


        public virtual List<TSType> GetInheritedTypesAndInterfaces(Type td)
        {
            var rtn = GetExportedInterfaces(td);

            if(td.BaseType != null)
                rtn.Add(GetBaseType(td));

            return rtn;
        } 

        public virtual TSType GetBaseType(Type td)
        {
            TSType type = null;

            //WriteExportedInterfaces(sb, inheriterString);
            if (td.BaseType != null)
            {
                type = (GetType(td.BaseType));
            }

            return type;
        } 


        public virtual List<TSType> GetExportedInterfaces(Type td)
        {
            var types = new List<TSType>();

            //WriteExportedInterfaces(sb, inheriterString);
            if (td.GetInterfaces().Any())
            {
                var interfaceTypes = td.GetInterfaces().Where(w => !w.Name.ShouldIgnoreTypeByName());
                if (interfaceTypes.Any())
                {
                    foreach (var item in interfaceTypes)
                    {
                        types.Add(GetType(item));
                    }
                }
            }

            return types;
        }
        

        public virtual List<TSMethod> GetMethods(Type td)
        {
            var tsMethods = new List<TSMethod>();
            var methods =
                td.GetMethods(BindingFlags.Instance | BindingFlags.Public | BindingFlags.DeclaredOnly |
                                          BindingFlags.NonPublic).Where(m => m.IsHideBySig == false);

            foreach (var method in methods)
            {
                var tsMethod = new TSMethod();

                var methodName = method.Name;

                // ignore special event handler methods
                if (method.GetParameters().Any() &&
                    method.GetParameters()[0].Name.StartsWith("__param0") &&
                    (methodName.StartsWith("add_") || methodName.StartsWith("remove_")))
                    continue;

                if (method.IsSpecialName && !method.IsConstructor)
                    continue;

                // translate the constructor function
                if (method.IsConstructor)
                {
                    methodName = "constructor";
                }

                // Lowercase first char of the method
                methodName = methodName.ToTypeScriptName();

                tsMethod.IsStatic = method.IsStatic;
                tsMethod.Name = methodName;

                var outTypes = new List<ParameterInfo>();
                method.GetParameters().Where(w => w.IsOut).Each(e => outTypes.Add(e));
                method.GetParameters().Where(w => !w.IsOut).For((parameter, i, isLast) =>
                {
                    tsMethod.Parameters.Add(new TSFuncParameter
                    {
                        Name = parameter.Name,
                        Type = new TSType(parameter.ParameterType.ToTypeScriptTypeName(), parameter.ParameterType.Namespace)
                    });
                });

                // constructors don't have return types.
                if (!method.IsConstructor)
                {
                    string returnType = method.ReturnType.ToTypeScriptTypeName();

                    //TODO: implement outtypes - returns an interface containing the out parameters
                    //if (outTypes.Any())
                    //{
                    //    var outWriter = new OutParameterReturnTypeWriter(Config, IndentCount, td, methodName, method.ReturnType, outTypes);

                    //    //extendedTypes.Add(outWriter);
                    //    returnType = outWriter.TypeName;
                    //}

                    tsMethod.ReturnType = new TSType(returnType, method.ReturnType.Namespace);
                }

                tsMethods.Add(tsMethod);
            }
            return tsMethods;
        }


        public virtual List<TSProperty> GetProperties(Type td)
        {
            var tsProperties = new List<TSProperty>();

            td.GetProperties().Each(prop =>
            {
                var propName_ = prop.Name;
                var propName = propName_.ToTypeScriptName();

                var propMethod = prop.GetMethod ?? prop.SetMethod;

                Type propType;

                try
                {
                    propType = prop.PropertyType.UnderlyingSystemType;
                }
                catch (Exception ex)
                {
                        
                    throw;
                }

                var tsProperty = new TSProperty
                {
                    IsStatic = propMethod.IsStatic,
                    Name = propName,
                    Type = new TSType(propType.ToTypeScriptTypeName(), propType.Namespace)
                };

                tsProperties.Add(tsProperty);
            });

            return tsProperties;
        }

        
        public virtual List<TSField> GetFields(Type td)
        {
            var fields = new List<TSField>();

            td.GetFields(BindingFlags.DeclaredOnly | BindingFlags.Public | BindingFlags.NonPublic).Where(f => f.IsSpecialName == false).Each(field =>
            {
                if (!field.IsPublic) return;
                var fieldName = field.Name.ToTypeScriptName();

                var tsField = new TSField
                {
                    Name = fieldName,
                    Type = new TSType(field.FieldType.ToTypeScriptType(), field.FieldType.Namespace)
                };

                fields.Add(tsField);
            });

            return fields;
        }
        
        public virtual List<TSEvent> GetEvents(Type td)
        {
            var events = new List<TSEvent>();

            if (td.GetEvents().Any())
            {
                td.GetEvents().For((item, i, isLast) =>
                {
                    events.Add(new TSEvent
                    {
                        EventHandlerType = new TSType(item.EventHandlerType.ToTypeScriptTypeName(), item.EventHandlerType.Namespace),
                        Name = item.Name.ToLower()
                    });
                });
            }

            return events;
        }
    }
}
