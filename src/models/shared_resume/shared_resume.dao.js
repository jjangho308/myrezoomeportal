class SharedResumeDAO extends AbstractDAO {
    constructor(connectionPool) {
        super(connectionPool);
        this.connectionPool = connectionPool;
    }

    put(sharedResume, cb) {

    }

    get(sharedResumeId, cb) {

    }

    del(sharedResumeId, cb) {

    }

    search(opt, cb) {
        var resumeId = opt.resumeId;
        var url = opt.url;

        // ResumeID나 URL 둘 중 하나로 검색해서 callback;
    }
}