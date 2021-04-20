import { makeAutoObservable } from "mobx";
const hash = window.location.hash;

// console.log(hash);

class GlobalStore {
	curTab = hash;

	constructor() {
		makeAutoObservable(this);
	}

	setCurTab = (tab: string) => {
		this.curTab = tab;
	}
}

export default GlobalStore;
