export function getFirstDigitAtStart(input: string): string | null {
    const match = input.match(/^\d/); // 使用正则表达式匹配字符串开头的数字
    return match ? match[0] : null;  // 如果匹配成功，返回匹配的数字，否则返回null
}