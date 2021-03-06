import React from 'react';

interface Props {
  viewHtml: string
}

const View: React.FC<Props> = (props) => {
  const { viewHtml = '' } = props;
  return (
    <div className="rs-view-wrapper">
      <div className="rs-view" dangerouslySetInnerHTML={{ __html: viewHtml }}>
      </div>
    </div>
  )
}

export default View;
