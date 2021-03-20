import React from 'react';
import { observer } from "mobx-react";
import { useStores } from "@src/store";
interface Props {

}

const View: React.FC<Props> = observer(() => {
  const { templateStore } = useStores();
  return (
    <div className="rs-view-wrapper">
      <div className="rs-view-inner">
        <div className="rs-view" dangerouslySetInnerHTML={{ __html: templateStore.html }}>
        </div>
      </div>
    </div>
  )
})

export default View;
