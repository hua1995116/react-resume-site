import { makeAutoObservable } from "mobx";
import { INIT_COLOR } from '@utils/const'
import { INIT_CONTENT } from '@utils/const';

const localContent = localStorage.getItem('md-resume');

class TemplateStore {
	color = INIT_COLOR;
	mdContent = localContent || INIT_CONTENT;

	constructor() {
		makeAutoObservable(this);
	}

	setColor = (color: string) => {
		this.color = color;
	};

	setMdContent = (content: string) => {
		this.mdContent = content;
	}
}

export default TemplateStore;
