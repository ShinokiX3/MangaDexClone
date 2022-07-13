import React, { memo } from 'react';
import Card from '../../../../Features/Card/Card';

const RelatedTab = memo(({ mangaRelations }) => {
    return (<Card mangasArr={mangaRelations} />);
});

export default RelatedTab;