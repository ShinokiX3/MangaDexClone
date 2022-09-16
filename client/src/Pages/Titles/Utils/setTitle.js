const setTitle = (ini) => {
    switch (ini) {
        case 'seasonal': return 'Seasonal';
        case 'recently': return 'Recently Added';
        case 'latest': return 'Latest Updates';
        default: return 'Advanced Search';
    }
};

export default setTitle;