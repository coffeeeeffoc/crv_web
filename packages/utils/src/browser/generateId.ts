import { customAlphabet } from 'nanoid';
import { v4 } from 'uuid';

const idAlphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const idSize = 7;

export const uuid = v4;

// 根据指定字母表以及指定长度，来生成id
export const generateId = customAlphabet(idAlphabet, idSize);

// 生成只有字母的id
export const generateStringId = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', idSize);

export const nanoid = generateId;

export default generateId;
