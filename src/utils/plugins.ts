
interface Plugin {
    params: unknown
    fn: (html: string, params: Plugin['params']) => string
}

interface Options {
    plugins: Plugin[]
}

export function renderPlugin(html: string, options: Options): string {
    return options.plugins.reduce((content: string, plugin) => {
        return plugin.fn(content, plugin.params);
    }, html);
}

export function colorPlugin(html: string, options: any): string {
    const newReg = new RegExp('#{color}', 'g');
    return html.replace(newReg, options?.color.replace('#', ''));
}
