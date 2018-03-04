import DatabaseManager from '../modules/db';

describe.skip('Cassandra test suit', () => {
    var db = null;
    before('DB module initialize', () => {
        db = new DatabaseManager();
        db.connectCsdr({
            contactPoints: ['127.0.0.1'],
            keyspace: 'rzm_anchor'
        })
    })

    it('Put & Get transaction', done => {

    })

    it('Del transaction', done => {

    })

    it('Set transaction', done => {

    })

    after('Disconnect cassandra connection', () => {
        db.disconnectCsdr();
    })
})

describe.skip('MySQL test suit', () => {
    var db = null;
    before('DB module initialize', () => {
        db = new DatabaseManager();
        db.connectMySQL({
            host: 'localhost',
            user: 'me',
            password: 'secret',
            database: 'my_db'
        })
    });

    it('Put & Get user', done=>{
        var userDAO = db.getUserDAO();
        userDAO.put({

        }, ()=>{
            userDAO.get()
        })
    })
})