export default {
    getSdkDownloadView : (req, res, next) => {
        res.render('developer_sdk_download', {});
    },
    getJSreferenceView : (req, res, next) => {
        res.render('developer_js_reference', {});
    },
    getOAuth2referenceView : (req, res, next) => {
        res.render('developer_oauth_reference',{});
    }

}