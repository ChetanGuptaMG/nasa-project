const DEFAULT_PAGE_LIMIT = 0;
const DEFAULT_PAGE_NUMBER = 1;

function pagination(query){
    const { skip, limit } = query;
    const pageNumber = Math.abs(skip) || DEFAULT_PAGE_NUMBER;
    const pageLimit = Math.abs(limit) || DEFAULT_PAGE_LIMIT;
    return {
        skip: pageNumber * pageLimit,
        limit: pageLimit,
    };
}

module.exports = {
    pagination,
};