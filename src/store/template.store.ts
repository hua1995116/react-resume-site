import { makeAutoObservable } from "mobx";
import { INIT_COLOR } from '@src/utils/global'

class templateStore {
	color = INIT_COLOR;
	mdContent = '';

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
