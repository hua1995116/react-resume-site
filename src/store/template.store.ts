import { makeAutoObservable } from "mobx";
import { INIT_COLOR, INIT_CONTENT, LOCAL_STORE, themes } from '@utils/const';

const default_theme = localStorage.getItem(LOCAL_STORE.MD_THEME) || themes[0].id;

const localContent = localStorage.getItem(LOCAL_STORE.MD_RESUME);

class TemplateStore {
	theme = default_theme;
	tempTheme = default_theme;
	color = INIT_COLOR;
	mdContent = localContent || INIT_CONTENT;
	html = '';
	isPreview = false;

	constructor() {
		makeAutoObservable(this);
	}

	setPreview = (value: boolean) => {
		this.isPreview = value;
	}

	setTempTheme = (theme: string) => {
		// 用户选择页
		this.tempTheme = theme;
	}

	setTheme = (theme: string) => {
		this.theme = theme;
	}

	setColor = (color: string) => {
		this.color = color;
	};

	setMdContent = (content: string) => {
		this.mdContent = content;
	}

	setHtml = (value: string) => {
		this.html = value;
	}
}

export default TemplateStore;
