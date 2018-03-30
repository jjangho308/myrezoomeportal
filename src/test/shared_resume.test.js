import Initialize from '../core/initializer';
import SharedResumeDAO from '../models/shared_resume/shared_resume_dao';
import Managers from '../core/managers';
import SharedResumeModel from '../models/shared_resume/shared_resume';
import Util from '../util/util';

/**
 * Test suit for shared_cert model and DAO. <br />
 * 
 * @since 180328
 * @author JJANGHO
 */

describe('Shared resume DAO test suit.', () => {
     before('Service initialize', () => {
         Initialize();
     });

     it('1. Shared resume PUT & GET TEST', done => {
        var SharedResumeDAO = Managers.db().getSharedResumeDAO();

        var date = new Date();
        var year = date.getFullYear(); //년도
        var month = date.getMonth()+1; //월 (월은 0부터 시작)
        var day = date.getDate(); //일
              
        var sharedResume=new SharedResumeModel({
            rsmid: Util.uuid(),
            url: 'asdf.' + getRandomInt(1, 10000) + '.rezoome.io',
            password: Util.uuid(),
            exp: year+"-"+month+"-"+day,
            delYN: 'N',
            pubYN: 'N'
        });

        SharedResumeDAO.put(sharedResume, (err, result)=>{
            if(err){
                console.log(err.toString());
            }else{
                
                SharedResumeDAO.get({
                    suid: result.insertId
                }, (err, sharedresumeinforesult)=>{
                    if(err){
                        console.log(err);
                    }else if (sharedresumeinforesult[0].url==sharedResume.url){
                        done();
                    }
                });
            }
        })
     })

    //  it.skip('2. Shared resume Update test ', done => {
    //     var sharedCertDAO = Managers.db().getSharedCertDAO();

    //     var date = new Date();
    //     var year = date.getFullYear(); //년도
    //     var month = date.getMonth()+1; //월 (월은 0부터 시작)
    //     var day = date.getDate(); //일
              
    //     var sharedCert=new SharedCertModel({
    //         certid: Util.uuid(),
    //         url: 'asdf.' + getRandomInt(1, 10000) + '.rezoome.io',
    //         password: Util.uuid(),
    //         exp: year+"-"+month+"-"+day,
    //         delYN: 'N',
    //         pubYN: 'N'
    //     });

    //     sharedCertDAO.put(sharedCert, (err, result)=> {
    //         if(err){
    //             console.log(err.toString());
    //         }else{
    //             sharedCert.exp = year+"-"+month+"-"+(day+1);
    //             sharedCertDAO.set({
    //                 suid: result.insertId
    //             }, sharedCert, (err, resultrows)=>{
    //                 if(err){
    //                     console.log(err.toString());
    //                 }else if(resultrows > 0){
    //                     done();
    //                 }
    //             })                
    //         }
    //     })
    //  })
    })


 function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
 }