
import React from "react";
import TemplateStore from "./template.store";
import GlobalStore from "./global.store";

class RootStore {
	templateStore
	globalStore
	constructor() {
		this.templateStore = new TemplateStore()
		this.globalStore = new GlobalStore();
	}
}

const StoresContext = React.createContext(new RootStore());

// this will be the function available for the app to connect to the stores
export const useStores = () => React.useContext(StoresContext);
