
class Pagination {
    constructor({page = 1, limit, count, numPageLink = 2}) {
        this.pageStart = page;
        this.offset = (page - 1) * limit;
        this.prev=page-1 >0?page-1:1;
        this.next=page+1;
        this.prevPages = this.pageStart - numPageLink > 0 ? this.pageStart - numPageLink : 1;
        this.nextPages = this.pageStart + numPageLink;
        this.numPages = Math.ceil(count / limit);
        this.pageEnd = page + numPageLink < this.numPages ? page + numPageLink : this.numPages;
    }

    get () {
        return {
            pageStart: this.pageStart,
            offset: this.offset,
            prev: this.prev,
            next: this.next,
            prevPages: this.prevPages,
            nextPages: this.nextPages,
            numPages: this.numPages,
            pageEnd: this.pageEnd
        }
    }
}

module.exports = Pagination