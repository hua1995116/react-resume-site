import React from 'react';
import { observer } from "mobx-react";
import { useStores } from "@src/store";
import Preview from '@src/components/Preview';

const View: React.FC = observer(() => {
  const { templateStore } = useStores();
  return (
    <div className="rs-view-wrapper">
      <Preview></Preview>
      <div className="rs-view-inner">
        <div className="rs-view" dangerouslySetInnerHTML={{ __html: templateStore.html }}>
        </div>
      </div>
    </div>
  )
})

export default View;
