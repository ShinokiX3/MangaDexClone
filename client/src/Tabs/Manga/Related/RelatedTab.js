import React, { memo } from 'react';
import Card from './../../../Components/Card/Card';

const RelatedTab = memo(({ mangaRelations }) => {
    return (<Card mangasArr={mangaRelations} />);
});

export default RelatedTab;