import { makeAutoObservable } from "mobx";
import { INIT_COLOR } from '@src/utils/global'
import { INIT_CONTENT } from '@src/utils/global';

const localContent = localStorage.getItem('md-resume');

class templateStore {
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

export default templateStore;
