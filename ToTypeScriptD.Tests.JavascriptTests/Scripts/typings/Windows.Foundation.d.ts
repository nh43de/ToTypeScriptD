declare module Windows.Foundation {

    export class AsyncActionCompletedHandler {
        constructor(object: any, method: number);
        invoke(asyncInfo: Windows.Foundation.IAsyncAction, asyncStatus: Windows.Foundation.AsyncStatus): void;
    }

    export class AsyncActionProgressHandler<TProgress> {
        constructor(object: any, method: number);
        invoke(asyncInfo: Windows.Foundation.IAsyncActionWithProgress<TProgress>, progressInfo: TProgress): void;
    }

    export class AsyncActionWithProgressCompletedHandler<TProgress> {
        constructor(object: any, method: number);
        invoke(asyncInfo: Windows.Foundation.IAsyncActionWithProgress<TProgress>, asyncStatus: Windows.Foundation.AsyncStatus): void;
    }

    export class AsyncOperationCompletedHandler<TResult> {
        constructor(object: any, method: number);
        invoke(asyncInfo: Windows.Foundation.IAsyncOperation<TResult>, asyncStatus: Windows.Foundation.AsyncStatus): void;
    }

    export class AsyncOperationProgressHandler<TResult,TProgress> {
        constructor(object: any, method: number);
        invoke(asyncInfo: Windows.Foundation.IAsyncOperationWithProgress<TResult,TProgress>, progressInfo: TProgress): void;
    }

    export class AsyncOperationWithProgressCompletedHandler<TResult,TProgress> {
        constructor(object: any, method: number);
        invoke(asyncInfo: Windows.Foundation.IAsyncOperationWithProgress<TResult,TProgress>, asyncStatus: Windows.Foundation.AsyncStatus): void;
    }

    enum AsyncStatus {
        started,
        completed,
        canceled,
        error
    }

    export class DateTime {
        universalTime: number;
    }

    export class EventHandler<T> {
        constructor(object: any, method: number);
        invoke(sender: any, args: T): void;
    }

    export class EventRegistrationToken {
        value: number;
    }

    export class HResult {
        value: number;
    }

    export interface IAsyncAction extends Windows.Foundation.IAsyncInfo {
        completed: Windows.Foundation.AsyncActionCompletedHandler;
        getResults(): void;
    }

    export interface IAsyncActionWithProgress<TProgress> extends Windows.Foundation.IAsyncInfo {
        progress: Windows.Foundation.AsyncActionProgressHandler<TProgress>;
        completed: Windows.Foundation.AsyncActionWithProgressCompletedHandler<TProgress>;
        getResults(): void;
    }

    export interface IAsyncInfo {
        errorCode: Windows.Foundation.HResult;
        id: number;
        status: Windows.Foundation.AsyncStatus;
        cancel(): void;
        close(): void;
    }

    export interface IAsyncOperation<TResult> extends Windows.Foundation.IAsyncInfo {
        completed: Windows.Foundation.AsyncOperationCompletedHandler<TResult>;
        getResults(): TResult;
    }

    export interface IAsyncOperationWithProgress<TResult,TProgress> extends Windows.Foundation.IAsyncInfo {
        progress: Windows.Foundation.AsyncOperationProgressHandler<TResult,TProgress>;
        completed: Windows.Foundation.AsyncOperationWithProgressCompletedHandler<TResult,TProgress>;
        getResults(): TResult;
    }

    export interface IClosable {
        close(): void;
    }

    export interface IGetActivationFactory {
        getActivationFactory(activatableClassId: string): any;
    }

    export interface IPropertyValue {
        isNumericScalar: boolean;
        type: Windows.Foundation.PropertyType;
        getUInt8(): number;
        getInt16(): number;
        getUInt16(): number;
        getInt32(): number;
        getUInt32(): number;
        getInt64(): number;
        getUInt64(): number;
        getSingle(): number;
        getDouble(): number;
        getChar16(): number;
        getBoolean(): boolean;
        getString(): string;
        getGuid(): string;
        getDateTime(): Date;
        getTimeSpan(): Windows.Foundation.TimeSpan;
        getPoint(): Windows.Foundation.Point;
        getSize(): Windows.Foundation.Size;
        getRect(): Windows.Foundation.Rect;
        getUInt8Array(value: TodoOutParameters): void;
        getInt16Array(value: TodoOutParameters): void;
        getUInt16Array(value: TodoOutParameters): void;
        getInt32Array(value: TodoOutParameters): void;
        getUInt32Array(value: TodoOutParameters): void;
        getInt64Array(value: TodoOutParameters): void;
        getUInt64Array(value: TodoOutParameters): void;
        getSingleArray(value: TodoOutParameters): void;
        getDoubleArray(value: TodoOutParameters): void;
        getChar16Array(value: TodoOutParameters): void;
        getBooleanArray(value: TodoOutParameters): void;
        getStringArray(value: TodoOutParameters): void;
        getInspectableArray(value: TodoOutParameters): void;
        getGuidArray(value: TodoOutParameters): void;
        getDateTimeArray(value: TodoOutParameters): void;
        getTimeSpanArray(value: TodoOutParameters): void;
        getPointArray(value: TodoOutParameters): void;
        getSizeArray(value: TodoOutParameters): void;
        getRectArray(value: TodoOutParameters): void;
    }

    export interface IPropertyValueStatics {
        createEmpty(): any;
        createUInt8(value: number): any;
        createInt16(value: number): any;
        createUInt16(value: number): any;
        createInt32(value: number): any;
        createUInt32(value: number): any;
        createInt64(value: number): any;
        createUInt64(value: number): any;
        createSingle(value: number): any;
        createDouble(value: number): any;
        createChar16(value: number): any;
        createBoolean(value: boolean): any;
        createString(value: string): any;
        createInspectable(value: any): any;
        createGuid(value: string): any;
        createDateTime(value: Date): any;
        createTimeSpan(value: Windows.Foundation.TimeSpan): any;
        createPoint(value: Windows.Foundation.Point): any;
        createSize(value: Windows.Foundation.Size): any;
        createRect(value: Windows.Foundation.Rect): any;
        createUInt8Array(value: System.Byte[]): any;
        createInt16Array(value: System.Int16[]): any;
        createUInt16Array(value: System.UInt16[]): any;
        createInt32Array(value: System.Int32[]): any;
        createUInt32Array(value: System.UInt32[]): any;
        createInt64Array(value: System.Int64[]): any;
        createUInt64Array(value: System.UInt64[]): any;
        createSingleArray(value: System.Single[]): any;
        createDoubleArray(value: System.Double[]): any;
        createChar16Array(value: System.Char[]): any;
        createBooleanArray(value: System.Boolean[]): any;
        createStringArray(value: System.String[]): any;
        createInspectableArray(value: System.Object[]): any;
        createGuidArray(value: System.Guid[]): any;
        createDateTimeArray(value: Windows.Foundation.DateTime[]): any;
        createTimeSpanArray(value: Windows.Foundation.TimeSpan[]): any;
        createPointArray(value: Windows.Foundation.Point[]): any;
        createSizeArray(value: Windows.Foundation.Size[]): any;
        createRectArray(value: Windows.Foundation.Rect[]): any;
    }

    export interface IReference<T> extends Windows.Foundation.IPropertyValue {
        value: T;
    }

    export interface IReferenceArray<T> extends Windows.Foundation.IPropertyValue {
        value: T[];
    }

    export interface IUriEscapeStatics {
        unescapeComponent(toUnescape: string): string;
        escapeComponent(toEscape: string): string;
    }

    export interface IUriRuntimeClass {
        absoluteUri: string;
        displayUri: string;
        domain: string;
        extension: string;
        fragment: string;
        host: string;
        password: string;
        path: string;
        port: number;
        query: string;
        queryParsed: Windows.Foundation.WwwFormUrlDecoder;
        rawUri: string;
        schemeName: string;
        suspicious: boolean;
        userName: string;
        equals(pUri: Windows.Foundation.Uri): boolean;
        combineUri(relativeUri: string): Windows.Foundation.Uri;
    }

    export interface IUriRuntimeClassFactory {
        createUri(uri: string): Windows.Foundation.Uri;
        createUri(baseUri: string, relativeUri: string): Windows.Foundation.Uri;
    }

    export interface IUriRuntimeClassWithAbsoluteCanonicalUri {
        absoluteCanonicalUri: string;
        displayIri: string;
    }

    export interface IWwwFormUrlDecoderEntry {
        name: string;
        value: string;
    }

    export interface IWwwFormUrlDecoderRuntimeClass extends Windows.Foundation.Collections.IIterable<Windows.Foundation.IWwwFormUrlDecoderEntry>, Windows.Foundation.Collections.IVectorView<Windows.Foundation.IWwwFormUrlDecoderEntry> {
        getFirstValueByName(name: string): string;
    }

    export interface IWwwFormUrlDecoderRuntimeClassFactory {
        createWwwFormUrlDecoder(query: string): Windows.Foundation.WwwFormUrlDecoder;
    }

    export class Point {
        x: number;
        y: number;
    }

    enum PropertyType {
        empty,
        uInt8,
        int16,
        uInt16,
        int32,
        uInt32,
        int64,
        uInt64,
        single,
        double,
        char16,
        boolean,
        string,
        inspectable,
        dateTime,
        timeSpan,
        guid,
        point,
        size,
        rect,
        otherType,
        uInt8Array,
        int16Array,
        uInt16Array,
        int32Array,
        uInt32Array,
        int64Array,
        uInt64Array,
        singleArray,
        doubleArray,
        char16Array,
        booleanArray,
        stringArray,
        inspectableArray,
        dateTimeArray,
        timeSpanArray,
        guidArray,
        pointArray,
        sizeArray,
        rectArray,
        otherTypeArray
    }

    export class PropertyValue {
        static createEmpty(): any;
        static createUInt8(value: number): any;
        static createInt16(value: number): any;
        static createUInt16(value: number): any;
        static createInt32(value: number): any;
        static createUInt32(value: number): any;
        static createInt64(value: number): any;
        static createUInt64(value: number): any;
        static createSingle(value: number): any;
        static createDouble(value: number): any;
        static createChar16(value: number): any;
        static createBoolean(value: boolean): any;
        static createString(value: string): any;
        static createInspectable(value: any): any;
        static createGuid(value: string): any;
        static createDateTime(value: Date): any;
        static createTimeSpan(value: Windows.Foundation.TimeSpan): any;
        static createPoint(value: Windows.Foundation.Point): any;
        static createSize(value: Windows.Foundation.Size): any;
        static createRect(value: Windows.Foundation.Rect): any;
        static createUInt8Array(value: System.Byte[]): any;
        static createInt16Array(value: System.Int16[]): any;
        static createUInt16Array(value: System.UInt16[]): any;
        static createInt32Array(value: System.Int32[]): any;
        static createUInt32Array(value: System.UInt32[]): any;
        static createInt64Array(value: System.Int64[]): any;
        static createUInt64Array(value: System.UInt64[]): any;
        static createSingleArray(value: System.Single[]): any;
        static createDoubleArray(value: System.Double[]): any;
        static createChar16Array(value: System.Char[]): any;
        static createBooleanArray(value: System.Boolean[]): any;
        static createStringArray(value: System.String[]): any;
        static createInspectableArray(value: System.Object[]): any;
        static createGuidArray(value: System.Guid[]): any;
        static createDateTimeArray(value: Windows.Foundation.DateTime[]): any;
        static createTimeSpanArray(value: Windows.Foundation.TimeSpan[]): any;
        static createPointArray(value: Windows.Foundation.Point[]): any;
        static createSizeArray(value: Windows.Foundation.Size[]): any;
        static createRectArray(value: Windows.Foundation.Rect[]): any;
    }

    export class Rect {
        x: number;
        y: number;
        width: number;
        height: number;
    }

    export class Size {
        width: number;
        height: number;
    }

    export class TimeSpan {
        duration: number;
    }

    export class TypedEventHandler<TSender,TResult> {
        constructor(object: any, method: number);
        invoke(sender: TSender, args: TResult): void;
    }

    export class Uri implements Windows.Foundation.IUriRuntimeClass, Windows.Foundation.IUriRuntimeClassWithAbsoluteCanonicalUri {
        absoluteUri: string;
        displayUri: string;
        domain: string;
        extension: string;
        fragment: string;
        host: string;
        password: string;
        path: string;
        port: number;
        query: string;
        queryParsed: Windows.Foundation.WwwFormUrlDecoder;
        rawUri: string;
        schemeName: string;
        suspicious: boolean;
        userName: string;
        absoluteCanonicalUri: string;
        displayIri: string;
        constructor(uri: string);
        constructor(baseUri: string, relativeUri: string);
        equals(pUri: Windows.Foundation.Uri): boolean;
        combineUri(relativeUri: string): Windows.Foundation.Uri;
        static unescapeComponent(toUnescape: string): string;
        static escapeComponent(toEscape: string): string;
    }

    export class WwwFormUrlDecoder implements Windows.Foundation.IWwwFormUrlDecoderRuntimeClass, Windows.Foundation.Collections.IIterable<Windows.Foundation.IWwwFormUrlDecoderEntry>, Windows.Foundation.Collections.IVectorView<Windows.Foundation.IWwwFormUrlDecoderEntry> {
        size: number;
        constructor(query: string);
        getFirstValueByName(name: string): string;
        first(): Windows.Foundation.Collections.IIterator<Windows.Foundation.IWwwFormUrlDecoderEntry>;
        getAt(index: number): Windows.Foundation.IWwwFormUrlDecoderEntry;
        indexOf(value: Windows.Foundation.IWwwFormUrlDecoderEntry, index: TodoOutParameters): boolean;
        getMany(startIndex: number, items: Windows.Foundation.IWwwFormUrlDecoderEntry[]): number;
    }

}
declare module Windows.Foundation.Collections {

    enum CollectionChange {
        reset,
        itemInserted,
        itemRemoved,
        itemChanged
    }

    export interface IIterable<T> {
        first(): Windows.Foundation.Collections.IIterator<T>;
    }

    export interface IIterator<T> {
        current: T;
        hasCurrent: boolean;
        moveNext(): boolean;
        getMany(items: T[]): number;
    }

    export interface IKeyValuePair<K,V> {
        key: K;
        value: V;
    }

    export interface IMap<K,V> extends Windows.Foundation.Collections.IIterable<Windows.Foundation.Collections.IKeyValuePair<K,V>> {
        size: number;
        lookup(key: K): V;
        hasKey(key: K): boolean;
        getView(): Windows.Foundation.Collections.IMapView<K,V>;
        insert(key: K, value: V): boolean;
        remove(key: K): void;
        clear(): void;
    }

    export interface IMapChangedEventArgs<K> {
        collectionChange: Windows.Foundation.Collections.CollectionChange;
        key: K;
    }

    export interface IMapView<K,V> extends Windows.Foundation.Collections.IIterable<Windows.Foundation.Collections.IKeyValuePair<K,V>> {
        size: number;
        lookup(key: K): V;
        hasKey(key: K): boolean;
        split(first: TodoOutParameters, second: TodoOutParameters): void;
    }

    export interface IObservableMap<K,V> extends Windows.Foundation.Collections.IMap<K,V> {
        addEventListener(type: string, listener: EventListener): void;
        removeEventListener(type: string, listener: EventListener): void;
        onmapchanged(ev: any);
        add_MapChanged(vhnd: Windows.Foundation.Collections.MapChangedEventHandler<K,V>): Windows.Foundation.EventRegistrationToken;
        remove_MapChanged(token: Windows.Foundation.EventRegistrationToken): void;
    }

    export interface IObservableVector<T> extends Windows.Foundation.Collections.IVector<T> {
        addEventListener(type: string, listener: EventListener): void;
        removeEventListener(type: string, listener: EventListener): void;
        onvectorchanged(ev: any);
        add_VectorChanged(vhnd: Windows.Foundation.Collections.VectorChangedEventHandler<T>): Windows.Foundation.EventRegistrationToken;
        remove_VectorChanged(token: Windows.Foundation.EventRegistrationToken): void;
    }

    export interface IPropertySet extends Windows.Foundation.Collections.IObservableMap<System.String,System.Object>, Windows.Foundation.Collections.IMap<System.String,System.Object>, Windows.Foundation.Collections.IIterable<Windows.Foundation.Collections.IKeyValuePair<System.String,System.Object>> {
    }

    export interface IVector<T> extends Windows.Foundation.Collections.IIterable<T> {
        size: number;
        getAt(index: number): T;
        getView(): Windows.Foundation.Collections.IVectorView<T>;
        indexOf(value: T, index: TodoOutParameters): boolean;
        setAt(index: number, value: T): void;
        insertAt(index: number, value: T): void;
        removeAt(index: number): void;
        append(value: T): void;
        removeAtEnd(): void;
        clear(): void;
        getMany(startIndex: number, items: T[]): number;
        replaceAll(items: T[]): void;
    }

    export interface IVectorChangedEventArgs {
        collectionChange: Windows.Foundation.Collections.CollectionChange;
        index: number;
    }

    export interface IVectorView<T> extends Windows.Foundation.Collections.IIterable<T> {
        size: number;
        getAt(index: number): T;
        indexOf(value: T, index: TodoOutParameters): boolean;
        getMany(startIndex: number, items: T[]): number;
    }

    export class MapChangedEventHandler<K,V> {
        constructor(object: any, method: number);
        invoke(sender: Windows.Foundation.Collections.IObservableMap<K,V>, event: Windows.Foundation.Collections.IMapChangedEventArgs<K>): void;
    }

    export class PropertySet implements Windows.Foundation.Collections.IPropertySet, Windows.Foundation.Collections.IObservableMap<System.String,System.Object>, Windows.Foundation.Collections.IMap<System.String,System.Object>, Windows.Foundation.Collections.IIterable<Windows.Foundation.Collections.IKeyValuePair<System.String,System.Object>> {
        addEventListener(type: string, listener: EventListener): void;
        removeEventListener(type: string, listener: EventListener): void;
        onmapchanged(ev: any);
        size: number;
        constructor();
        add_MapChanged(vhnd: Windows.Foundation.Collections.MapChangedEventHandler<System.String,System.Object>): Windows.Foundation.EventRegistrationToken;
        remove_MapChanged(token: Windows.Foundation.EventRegistrationToken): void;
        lookup(key: string): any;
        hasKey(key: string): boolean;
        getView(): Windows.Foundation.Collections.IMapView<System.String,System.Object>;
        insert(key: string, value: any): boolean;
        remove(key: string): void;
        clear(): void;
        first(): Windows.Foundation.Collections.IIterator<Windows.Foundation.Collections.IKeyValuePair<System.String,System.Object>>;
    }

    export class VectorChangedEventHandler<T> {
        constructor(object: any, method: number);
        invoke(sender: Windows.Foundation.Collections.IObservableVector<T>, event: Windows.Foundation.Collections.IVectorChangedEventArgs): void;
    }

}
declare module Windows.Foundation.Diagnostics {

    enum ErrorOptions {
        none,
        suppressExceptions,
        forceExceptions,
        useSetErrorInfo,
        suppressSetErrorInfo
    }

    export interface IErrorReportingSettings {
        setErrorOptions(value: Windows.Foundation.Diagnostics.ErrorOptions): void;
        getErrorOptions(): Windows.Foundation.Diagnostics.ErrorOptions;
    }

    export class RuntimeBrokerErrorSettings implements Windows.Foundation.Diagnostics.IErrorReportingSettings {
        constructor();
        setErrorOptions(value: Windows.Foundation.Diagnostics.ErrorOptions): void;
        getErrorOptions(): Windows.Foundation.Diagnostics.ErrorOptions;
    }

}
declare module Windows.Foundation.Metadata {

    export class ActivatableAttribute {
        constructor(version: number);
        constructor(type: System.Type, version: number);
    }

    export class AllowMultipleAttribute {
        constructor();
    }

    enum AttributeTargets {
        delegate,
        enum,
        event,
        field,
        interface,
        method,
        parameter,
        property,
        runtimeClass,
        struct,
        interfaceImpl,
        all
    }

    export class AttributeUsageAttribute {
        constructor(targets: Windows.Foundation.Metadata.AttributeTargets);
    }

    export class ComposableAttribute {
        constructor(type: System.Type, compositionType: Windows.Foundation.Metadata.CompositionType, version: number);
    }

    enum CompositionType {
        protected,
        public
    }

    export class DefaultAttribute {
        constructor();
    }

    export class DefaultOverloadAttribute {
        constructor();
    }

    export class DualApiPartitionAttribute {
        version: number;
        constructor();
    }

    export class ExclusiveToAttribute {
        constructor(typeName: System.Type);
    }

    enum GCPressureAmount {
        low,
        medium,
        high
    }

    export class GCPressureAttribute {
        amount: Windows.Foundation.Metadata.GCPressureAmount;
        constructor();
    }

    export class GuidAttribute {
        constructor(a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number);
    }

    export class HasVariantAttribute {
        constructor();
    }

    export class LengthIsAttribute {
        constructor(indexLengthParameter: number);
    }

    export class MarshalingBehaviorAttribute {
        constructor(behavior: Windows.Foundation.Metadata.MarshalingType);
    }

    enum MarshalingType {
        invalidMarshaling,
        none,
        agile,
        standard
    }

    export class MuseAttribute {
        version: number;
        constructor();
    }

    export class OverloadAttribute {
        constructor(method: string);
    }

    export class OverridableAttribute {
        constructor();
    }

    export class ProtectedAttribute {
        constructor();
    }

    export class RangeAttribute {
        constructor(minValue: number, maxValue: number);
    }

    export class StaticAttribute {
        constructor(type: System.Type, version: number);
    }

    export class ThreadingAttribute {
        constructor(model: Windows.Foundation.Metadata.ThreadingModel);
    }

    enum ThreadingModel {
        invalidThreading,
        sta,
        mta,
        both
    }

    export class VariantAttribute {
        constructor();
    }

    export class VersionAttribute {
        constructor(version: number);
    }

    export class WebHostHiddenAttribute {
        constructor();
    }

}

