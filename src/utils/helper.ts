import MarkdownIt from "markdown-it";
import MdContainer from 'markdown-it-container';

export const markdownParserResume = new MarkdownIt();

markdownParserResume
    .use(MdContainer, 'header')
    .use(MdContainer, 'left')
    .use(MdContainer, 'right')
    .use(MdContainer, 'title')
    .use(MdContainer, 'block')
