import MarkdownIt from "markdown-it";
import MdContainer from 'markdown-it-container';
import MdHContainer from './markdown-it-h-container';
import MdNContainer from './markdown-it-n';
import MdEmjio from 'markdown-it-emoji';
import svgMap from './svgMap';
import axios from 'axios';

export const markdownParserResume = new MarkdownIt({
    html: true,
    breaks: true,
});

markdownParserResume
    .use(MdEmjio, {
        defs: svgMap,
        shortcuts: Object.keys(svgMap).reduce<Record<string, string>>((obj, item) => {
            obj[item] = `icon:${item}`;
            return obj;
        }, {})
    })
    .use(MdHContainer)
    .use(MdContainer, 'header')
    .use(MdContainer, 'left', {
        render: function (tokens: any, idx: any) {
            if (tokens[idx].nesting === 1) {
                return '<div class="lr-container"><div class="left">';
            } else {
                return '</div>'
            }
        }
    })
    .use(MdContainer, 'right', {
        render: function (tokens: any, idx: any) {
            if (tokens[idx].nesting === 1) {
                // opening tag
                return '<div class="right">';
            } else {
                // closing tag
                return '</div></div>';
            }
        }

    })
    .use(MdContainer, 'title')
    .use(MdNContainer)
    // const defaultParagraphRenderer = this.md.renderer.rules.paragraph_open || ((tokens, idx, options, env, self) => self.renderToken(tokens, idx, options));
    // this.md.renderer.rules.paragraph_open = function (tokens, idx, options, env, self) {
    //   let result = '';
    //   if (idx > 1) {
    //     const inline = tokens[idx - 2];
    //     const paragraph = tokens[idx];
    //     if (inline.type === 'inline' && inline.map && inline.map[1] && paragraph.map && paragraph.map[0]) {
    //       const diff = paragraph.map[0] - inline.map[1];
    //       if (diff > 0) {
    //         result = '<br>'.repeat(diff);
    //       }
    //     }
    //   }
    //   return result + defaultParagraphRenderer(tokens, idx, options, env, self);
    // };

export function downloadDirect(url: string, name: string) {
    const aTag = document.createElement('a');
    aTag.download = name;
    aTag.target = '_blank';
    aTag.href = url;
    aTag.click()
}

export function downloadByContent(content: any, filename: string, type: string) {
  const aTag = document.createElement('a');
  aTag.download = filename;
  const blob = new Blob([content], { type });
  const blobUrl = URL.createObjectURL(blob);
  aTag.href = blobUrl;
  aTag.click();
  URL.revokeObjectURL(blobUrl);
}

export async function downloadFetch(url: string, name: string) {
  const result = await axios({
    method: 'get',
    url,
    responseType: 'blob'
  });
  downloadByContent(result.data, name, 'application/pdf');
}

export function copyText(value: string, callback?: any) {
    const input = document.createElement('input');
    input.setAttribute('readonly', 'readonly');
    input.value = value;
    document.body.appendChild(input);
    input.select();
    input.setSelectionRange(0, 9999);
    if (document.execCommand('copy')) {
        document.execCommand('copy');
        callback && callback();
    }
    document.body.removeChild(input);
}

export const markdownParserArticle = new MarkdownIt({
    html: true
});
