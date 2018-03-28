
export default {
    get: (req, res, next) => {
        res.render('main', {});
    },

    edu: (req, res, next) => {
        var result = [
            {
                date: '2018-03-03 ~ 2018-04-04',
                orglogo: 'https://s3.ap-northeast-2.amazonaws.com/rezoome/org_logo/t_inha05_400x400.jpg',
                blc_map: true,
                org_name: '인하대학교',
                org_major: '학사, 공과대학 컴퓨터공학 전공',
                grade: '성적 : 3.5 / 4.5'
            },
            {
                date: '2018-03-03 ~ 2018-04-04',
                orglogo: 'https://s3.ap-northeast-2.amazonaws.com/rezoome/org_logo/img01_mark_ab0102.gif',
                blc_map: true,
                org_name: '서울대학교 대학원',
                org_major: '언론정보대학원 인터랙션디자인 전공',
                grade: '성적 : 3.8 / 4.5'
            }
        ]

        res.status(200).json(result);
        
    }

}