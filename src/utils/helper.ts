import MarkdownIt from "markdown-it";
import MdContainer from 'markdown-it-container';
import MdHContainer from './markdonw-it-h-container';

export const markdownParserResume = new MarkdownIt();

markdownParserResume
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
