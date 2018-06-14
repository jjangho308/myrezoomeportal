export default {
    getSdkDownloadView: (req, res, next) => {
        res.status(200).render('developer_sdk_download');
    },
    getJSreferenceView: (req, res, next) => {
        res.status(200).render('developer_js_reference');
    },
    getOAuth2referenceView: (req, res, next) => {
        res.status(200).render('developer_oauth_reference');
    }
}