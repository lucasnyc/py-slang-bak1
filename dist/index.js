(function (factory) {
    typeof define === 'function' && define.amd ? define(factory) :
    factory();
})((function () { 'use strict';

    //
    // // // Forbidden identifier
    // // text =
    // // `
    // // async def y():
    // //     pass
    // // `;
    // //
    // // Non four indent
    // // let text =
    // // `
    // // def x():
    // //    pass
    // // `;
    //
    // // // Unrecognised token
    // // text = `
    // //             ?
    // // `;
    //
    // // Unterminated string
    // // text = `\
    // //
    // // "abc" "abcdef`;
    //
    // // // Forbidden operator
    // // text =`
    // // a @= b
    // // `
    //
    // // // Expected token
    // // text = `
    // // def a(c, d)
    // //     pass
    // // `
    //
    // // // Expected else block
    // // text = `
    // // if y:
    // //     pass
    // //
    // // `;
    //
    // // // Expected colon after lambda:
    // // text = `
    // // x = lambda a
    // // `;
    //
    // // // Expected import
    // // text = `
    // // from x
    // // `;
    //
    // // // Bad identifier
    // // text = `
    // // def a(1, 2):
    // //     pass
    // // `;
    //
    // // // Missing closing parentheses:
    // // text = `
    // // def a(a, b:
    // //     pass
    // // `;
    //
    // // // @TODO Invalid assign target
    // // text = `
    // //
    // // 1 = 2 def a(b, c):
    // //     pass
    // // `;
    //
    // // Variable declaration hoisting
    // // text = `
    // // x = 1
    // // def a():
    // //     if True:
    // //         x = 1
    // //     else:
    // //         y = 2
    // //     def b():
    // //         x = 1
    // // `
    // // // Undeclared variable
    // // text = `
    // // x = display(a)
    // // `
    // // Misspelled name
    // // text = `
    // // displar(1)
    // // `
    //
    // // // Mispelled name 2
    //
    // // text = `
    // // def y(param):
    // //     def z():
    // //         var = display(barams)
    // // `
    //
    // // // Name reassignment
    //
    // // text = `
    // // x = 1
    // // while True:
    // //     pass
    // // x = lambda a:a
    // // `;
    //
    // // text = `
    // // # !x
    // // not x
    // // `
    //
    // // text = `
    // // (lambda a:a)(1)
    // //
    // // `;
    //
    // // text = `
    // // (x)(1)
    // // `;
    //
    // // text = `
    // // def a(b,c):
    // //     pass
    // // `;
    //
    /* Use as a command line script */
    /* npm run start:dev -- test.py */
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parsePythonToEstreeAst = parsePythonToEstreeAst;
    exports.runInContext = runInContext;
    const tslib_1 = require("tslib");
    const tokenizer_1 = require("./tokenizer");
    const parser_1 = require("./parser");
    const translator_1 = require("./translator");
    const resolver_1 = require("./resolver");
    const context_1 = require("./cse-machine/context");
    tslib_1.__exportStar(require("./errors"), exports);
    const pyRunner_1 = require("./runner/pyRunner");
    const initialise_1 = require("./conductor/runner/util/initialise");
    const PyEvaluator_1 = require("./conductor/runner/types/PyEvaluator");
    tslib_1.__exportStar(require("./errors"), exports);
    function parsePythonToEstreeAst(code, variant = 1, doValidate = false) {
        const script = code + '\n';
        const tokenizer = new tokenizer_1.Tokenizer(script);
        const tokens = tokenizer.scanEverything();
        const pyParser = new parser_1.Parser(script, tokens);
        const ast = pyParser.parse();
        if (doValidate) {
            new resolver_1.Resolver(script, ast).resolve(ast);
        }
        const translator = new translator_1.Translator(script);
        return translator.resolve(ast);
    }
    function runInContext(code_1, context_2) {
        return tslib_1.__awaiter(this, arguments, void 0, function* (code, context, options = {}) {
            const estreeAst = parsePythonToEstreeAst(code, 1, true);
            const result = (0, pyRunner_1.runCSEMachine)(code, estreeAst, context, options);
            return result;
        });
    }
    new context_1.Context();
    const { runnerPlugin, conduit } = (0, initialise_1.initialise)(PyEvaluator_1.PyEvaluator);

}));
//# sourceMappingURL=index.js.map
