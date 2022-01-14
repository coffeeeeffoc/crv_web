/**
 * 本文件用于动态值的各种处理，其中动态值的格式为 DynamicBasicFormat,也就是{_$type:xxx, _$content: yyy}的形式
 */
import { isFunctionStr, isArray, isObject, tryEval } from './utils';
import { deduplicate } from './array';

export enum DynamicBasicTypes {
  number = 'number',
  string = 'string',
  json = 'json',
  boolean = 'boolean',
  expression = 'expression',
  function = 'function',
  regExp = 'regExp',
};

interface DynamicBasicFormat<S extends DynamicBasicTypes, T> {
  _$type: S;
  _$content: T;
};
type JSONBasicType = number | null | string | boolean;
type JSONObjectType = {} | {
  [key: string]: JSONBasicType | any;
};
type JSONType = JSONObjectType | JSONObjectType[];

type DynamicNumber = DynamicBasicFormat<DynamicBasicTypes.number, number>;
type DynamicString = DynamicBasicFormat<DynamicBasicTypes.string, string>;
type DynamicJSON = DynamicBasicFormat<DynamicBasicTypes.json, JSONType>;
type DynamicBoolean = DynamicBasicFormat<DynamicBasicTypes.boolean, boolean>;
type DynamicExpression = DynamicBasicFormat<DynamicBasicTypes.expression, string>;
type DynamicFunction = DynamicBasicFormat<DynamicBasicTypes.function, string>;
type DynamicRegExp = DynamicBasicFormat<DynamicBasicTypes.regExp, string>;

export type DynamicValueFormat = DynamicNumber | DynamicString | DynamicJSON | DynamicBoolean | DynamicExpression | DynamicFunction | DynamicRegExp;

export const setDynamicValue = (type: DynamicBasicTypes, content: any) => ({
  _$type: type,
  _$content: content,
});

// 判断是否为满足DynamicBasicFormat格式的值
export const isDynamicValue = (value: any) => value && typeof value === 'object' && Object.keys(value).length === 2 && '_$type' in value && '_$content' in value;

// 表达式正则
export const expressionReg = /\$\{\w+(?:\.\w+)*\}/g;

// 初步判断表达式是否可能为函数
export const expressionMaybeFunctionReg = /=>|function\s*\([\s\S]*\)[\s\S]*\{[\s\S]*\}/;

// 判断字符串是否为函数表达式（ps:为什么先用正则匹配？因为不能随随便便用eval，最起码过滤一部分可能存在的脚本威胁）
export const isFunctionString = (str: string) => expressionMaybeFunctionReg.test(str) && typeof tryEval(str) === 'function';

// 摘取表达式包含的所有字段
export const getExpressionFields = (str: string) => deduplicate(str?.match(expressionReg)?.map(item => item.substring(2, item.length - 1)) ?? []);

// 摘取
// export const getDynamicFields = (json: any) => deduplicate(getExpressionFields(JSON.stringify(json ?? '')));
export const getDynamicFields = (json: any) => {
  const flatDynamicValueArr: any[] = [];
  const analyse = (config: any) => {
    config._$type !== 'default' && flatDynamicValueArr.push(getExpressionFields(config._$content));
  };
  recursiveParseDynamic(json, analyse);
  return deduplicate(flatDynamicValueArr);
};

// 解析公式的值
export const parseFormulaValue = (str: string, values: any) => {
  if (str) {
    if (isFunctionString(str)) {
      return parseDynamicFunction(str, values)[1];
    }
    return parseDynamicExpression(str, values)[1];
  }
};


/**
 * 解析动态表达式
 * @param content 待解析的函数
 * @param obj 待传给函数的参数，是一个对象，能够获取表达式中用到的所有字段
 * @returns [isSuccess, result] 返回值为数组，第一个元素为成功失败标志，第二个元素为结果
 */
export const parseDynamicExpression = (content: any, obj: any): [boolean, any] => {
  if (typeof content !== 'string') {
    return [false, content];
  }
  return parseDynamicFunction(
    `function(obj){return ${
      content.replace(
        expressionReg,
        (str: any) => `obj.${str.substring(2, str.length - 1)}`
      )
      }}`,
    obj
  );
};

// 替换动态表达式
export const replaceDynamicExpression = (content: any, obj: any): [boolean, any] => {
  if (typeof content !== 'string') {
    return [false, content];
  }
  return [
    true,
    content.replace(
      expressionReg,
      // // eslint-disable-next-line no-eval
      // (str: any) => eval(`obj.${str.substring(2, str.length - 1)}`)
      (str: any) => parseExpressionWithFunction(`obj.${str.substring(2, str.length - 1)}`, { obj })
    )
  ];
};

// 生成函数，而不是使用eval
// eslint-disable-next-line @typescript-eslint/no-implied-eval,no-new-func
export const generateFunction = (functionStr: string) => Function('"use strict";return (' + functionStr + ')')();

// eslint-disable-next-line @typescript-eslint/no-implied-eval,no-new-func
export const parseExpressionWithFunction = (expression: string, scope = {}) => new Function('$root', `with($root) { return (${expression}); }`)(scope);
// 为表达式时，可以写成后面这种形式：return new Function('$root', `with($root) { return (${expression}); }`)(scope)
/**
 * 解析动态函数
 * @param content 待解析的函数
 * @param params 待传给函数的参数，可以传递一个或者多个
 * @returns [isSuccess, result] 返回值为数组，第一个元素为成功失败标志，第二个元素为结果
 */
export const parseDynamicFunction = (content: any, ...params: any[]): [boolean, any] => {
  if (typeof content !== 'string') {
    return [false, content];
  }
  if (!isFunctionStr(content)) {
    return [false, content];
  }
  try {
    const result = generateFunction(content)(...params);
    console.log(`解析函数:${content},结果:${JSON.stringify(result)}`, result);
    return [true, result];
  } catch (e) {
    console.log('解析函数出错', e);
    return [false, undefined];
  }
};

// 仅解析动态值格式的内容，不解析表达式
export const parseDynamicContent = (value: any) => isDynamicValue(value) ? value._$content : value;

// 默认处理解析结果，不论是否出错，都返回result内容
export const defaultHandleParseResult = ([, result]: [boolean, any]) => result;

// 解析动态值格式，并解析表达式
export const parseDynamicValue = (value: any, options?: RecursiveParseOptionType) => {
  if (isDynamicValue(value)) {
    const { handleParseResult = defaultHandleParseResult, params = [] } = options ?? {};
    const { _$type, _$content } = value;
    switch (_$type) {
      case DynamicBasicTypes.regExp:
        return new RegExp(_$content);
      case DynamicBasicTypes.expression:
        return handleParseResult(parseDynamicExpression(_$content, params[0]));
      case DynamicBasicTypes.function:
        return handleParseResult(parseDynamicFunction(_$content, ...params));
      case DynamicBasicTypes.number:
      case DynamicBasicTypes.string:
      case DynamicBasicTypes.json:
      case DynamicBasicTypes.boolean:
      default:
        return _$content;
    }
  }
  // 不是满足条件的值时，原封不动返回
  return value;
};

// 递归解析动态值，其中analyse为解析函数
export const recursiveParseDynamic = (config: any, analyse: Function, options?: RecursiveParseOptionType) => {
  switch (true) {
    case isObject(config):
      return isDynamicValue(config)
        ? analyse(config, options)
        : Object.keys(config).reduce((res: any, key) => {
          res[key] = recursiveParseDynamic(config[key], analyse, options);
          return res;
        }, {});
    case isArray(config):
      return config.map((item: any) => recursiveParseDynamic(item, analyse, options));
    default:
      return config;
  }
};

interface RecursiveParseOptionType {
  handleParseResult?: ([isSuccess, result]: [boolean, any]) => any;
  params?: any[];
};

// 递归仅解析动态值格式的内容，不解析表达式
export const recursiveParseDynamicContent = <T = any>(config: T, options?: RecursiveParseOptionType): T =>
  recursiveParseDynamic(config, parseDynamicContent, options);

// 递归解析动态值格式，并解析表达式
export const recursiveParseDynamicValue = <T = any>(config: T, options?: RecursiveParseOptionType): T =>
// export const recursiveParseDynamicValue = (config, options?: RecursiveParseOptionType) =>
  recursiveParseDynamic(config, parseDynamicValue, options);
