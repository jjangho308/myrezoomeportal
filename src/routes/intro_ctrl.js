export default {
    get: (req, res, next) => {
        res.status(200).render('index');
    },
}