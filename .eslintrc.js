// http://eslint.org/docs/user-guide/configuring

// module.exports = {
//   root: true,
//   parser: 'babel-eslint',
//   parserOptions: {
//     sourceType: 'module'
//   },
//   env: {
//     browser: false,
//     node: true,
//     es6: true
//   },
//   // https://github.com/standard/standard/blob/master/docs/RULES-en.md
//   extends: 'standard',
//   // required to lint *.vue files
//   plugins: [
//     'html'
//   ],
//   // add your custom rules here
//   'rules': {
//     // allow paren-less arrow functions
//     'arrow-parens': 0,
//     // allow async-await
//     'generator-star-spacing': 0,
//     // allow debugger during development
//     'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
//     'indent': [
//         'error',
//         4,
//         {
//             "SwitchCase": 1
//         }
//     ],
//   },
//   globals: {
//     App: true,
//     Page: true,
//     wx: true,
//     swan: true,
//     tt: true,
//     my: true,
//     getApp: true,
//     getPage: true,
//     requirePlugin: true,
//     mpvue: true,
//     mpvuePlatform: true
//   }
// }

const resolve = require('path').resolve;

module.exports = {
    root: true,

    parserOptions: {
        parser: 'babel-eslint',
    },

    env: {
        browser: false,
        node: true,
        es6: true
    },

    extends: [
        // https://cn.vuejs.org/v2/style-guide/#%E4%BC%98%E5%85%88%E7%BA%A7-B-%E7%9A%84%E8%A7%84%E5%88%99%EF%BC%9A%E5%BC%BA%E7%83%88%E6%8E%A8%E8%8D%90-%E5%A2%9E%E5%BC%BA%E5%8F%AF%E8%AF%BB%E6%80%A7
        // https://github.com/vuejs/eslint-plugin-vue#priority-b-strongly-recommended-improving-readability
        'plugin:vue/strongly-recommended',

        // 英文：https://github.com/airbnb/javascript
        // 中文：https://github.com/sivan/javascript-style-guide/blob/master/es5/README.md
        'airbnb-base',
    ],

    plugins: [
        'vue',
    ],

    settings: {
        'import/resolver': {
            webpack: {
                config: {
                    resolve: {
                        extensions: ['.js', '.vue', '.json', '.scss'],
                        alias: {
                            'vue': 'mpvue',
                            '@': resolve(__dirname, 'src'),
                        },
                    }
                }
            }
        },
    },

    rules: {
        'no-shadow': [
            'error',
            {
                'allow': [
                    'state',
                    'getters'
                ],
            },
        ],
        'import/extensions': ['error', 'always', {
            js: 'never',
            json: 'never',
            vue: 'never',
        }],
        'import/no-unresolved': 'off',
        'no-param-reassign': 'off',
        'consistent-return': 'off',
        'global-require': 'off',
        'import/no-dynamic-require': 'off',
        'import/no-extraneous-dependencies': 'off',

        // 4 行空格缩进
        'vue/html-indent': [
            'error',
            4,
        ],
        'indent': [
            'error',
            4,
            {
                "SwitchCase": 1
            }
        ],
        // allow async-await
        // 'generator-star-spacing': 'off',
        'no-console': process.env.NODE_ENV === 'production' ? 2 : 0,
        "max-len": ["error", {
            "code": 150
        }],
    },
    globals: {
        App: true,
        Page: true,
        wx: true,
        swan: true,
        tt: true,
        my: true,
        getApp: true,
        getPage: true,
        requirePlugin: true,
        mpvue: true,
        mpvuePlatform: true
    }
}
