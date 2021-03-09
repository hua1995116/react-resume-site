
import React from "react";
import TemplateStore from "./template.store";

class RootStore {
	templateStore
	constructor() {
		this.templateStore = new TemplateStore()
	}
}

const StoresContext = React.createContext(new RootStore());

// this will be the function available for the app to connect to the stores
export const useStores = () => React.useContext(StoresContext);
