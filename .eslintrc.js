module.exports = {
	"env": {
		"node": true,
		"es6": true
	},
	"extends": [
		"recommended/node",
		"prettier",
		"plugin:prettier/recommended"
	],
	"plugins": ["prettier"],
	"rules": {
		"linebreak-style": [
			"error",
			"unix"
		],
		"quotes": [
			"error",
			"double"
		],
		"semi": [
			"error",
			"never"
		],
		"no-console": 0,
		"max-len": [
			1,
			{
				"code": 120,
				"ignoreStrings": true,
				"ignoreRegExpLiterals": true,
				"tabWidth": 2
			}
		],
		"comma-dangle": [2, "never"],
		"space-in-parens": [2, "never"],
		"comma-spacing": 2,
		"object-curly-spacing": [2, "never"],
		"import/no-commonjs": 0
	}
};
