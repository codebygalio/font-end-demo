module.exports = {
    root:true,
    parser:'babel-eslint',
    parserOptions: {
        sourceType: 'module', //源代码类型
        ecmaVersion: 2015
    },
    env: {
        browser:true
    },
    rules:{
        indent: ["error", 4],
        quotes: 'off',
        'no-console':'error'
    }
}