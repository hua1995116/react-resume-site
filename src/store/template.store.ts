import { makeAutoObservable } from "mobx";
import { INIT_COLOR, INIT_CONTENT, LOCAL_STORE } from '@utils/const';

const localContent = localStorage.getItem(LOCAL_STORE.MD_RESUME);

class TemplateStore {
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
