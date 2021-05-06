import MarkdownIt from 'markdown-it'

export default function MdHContainer(md: MarkdownIt) {
    const heading_map: string[] = [];

    md.block.ruler.after(
        "fence",
        "myplugin",
        function (state, line, maxLine) {
            let rg = /^(#+)\s(.*)/;
            let start = state.bMarks[line] + state.tShift[line];
            let end = state.eMarks[line];
            let text = state.src.substring(start, end);
            let match = text.match(rg);
            if (match && match.length) {
                const heading_level = match[1];
                const heading_level_length = heading_level.length;
                const index = heading_map.lastIndexOf(heading_level);
                if (index === -1) {
                    state.push(`container_div_${heading_level_length}_open`, "div", 1);
                    heading_map.push(heading_level);
                } else {
                    const diffIndex = heading_map.length - 1 - index;
                    for (let i = 0; i < diffIndex; i++) {
                        state.push("container_div_heading__close", "div", -1);
                        heading_map.pop();
                    }
                    state.push("container_div_heading__close", "div", -1);
                    state.push(`container_div_${heading_level_length}_open`, "div", 1);
                }
            }
            return false;
        }
    );
    md.core.ruler.after("inline", "footnote_tail", (state) => {
        const length = heading_map.length;
        for (let i = 0; i < length; i++) {
            const token = new state.Token("container_div_heading__close", "div", -1);
            state.tokens.push(token);
            heading_map.pop();
        }
        return false;
    })

    md.renderer.rules["container_div_heading__close"] =  function (tokens, idx, _options, env, slf) {
        return slf.renderToken(tokens, idx, _options);
    };
    (new Array(5).fill(0)).forEach((_, index) => {
        md.renderer.rules[`container_div_${index + 1}_open`] = function (tokens, idx, _options, env, slf) {
            if (tokens[idx].nesting === 1) {
                tokens[idx].attrJoin('class', `h${index + 1}_block`);
                tokens[idx].attrJoin('class', `block`);
            }
            return slf.renderToken(tokens, idx, _options);
        };
    })
}
