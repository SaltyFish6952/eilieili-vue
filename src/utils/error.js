export function throwError(params, vue) {
    vue.$message.error('error: ' + JSON.stringify(params));
    window.console.error('error: ' + JSON.stringify(params))
}