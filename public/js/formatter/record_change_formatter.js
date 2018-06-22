! function (_win) {
    var record_change_formatter = _win.record_change_formatter = {
        "RCLPT0005": function viewformatter(record) {
            // opic
                var jsonData = record.data;

                var htmldiv = '<tr class="change_cert">';
                htmldiv = htmldiv + '<td>';
                htmldiv = htmldiv + '<div id=change_cert_' + record.subid + ' class="abc-radio">';
                if (record.dftYn == "Y") {
                    htmldiv = htmldiv + '<input id=change_cert_' + record.txid + ' type="radio" name="spec-change" checked>';
                } else {
                    htmldiv = htmldiv + '<input id=change_cert_' + record.txid + ' type="radio" name="spec-change">';
                }
                htmldiv = htmldiv + '<label for=change_cert_' + record.txid + '></label>';
                htmldiv = htmldiv + '</div>';
                htmldiv = htmldiv + '</td>';
                if(jsonData.ctestday != undefined) {
                    htmldiv = htmldiv + '<td>' + formatDate(jsonData.ctestday) + '</td>';
                }
                else if(jsonData.ea_exam_time != undefined) {
                    htmldiv = htmldiv + '<td>' + formatDate(jsonData.ea_exam_time) + '</td>';
                }
                htmldiv = htmldiv + '<td>' + jsonData.subjseq + '</td>';
                htmldiv = htmldiv + '<td>' + jsonData.testtype + '</td>';
                htmldiv = htmldiv + '<td>' + jsonData.rating + '</td>';
                htmldiv = htmldiv + '<td>' + record.dftYn + '</td>';
                htmldiv = htmldiv + '</tr>';
                $("#spec-change-table").append(htmldiv);

        },

        "RCCNF0001": function viewformatter(record) {
            //mktest
            var jsonData = record.data;
            var htmldiv = '<tr class="change_cert">';
                htmldiv = htmldiv + '<td>';
                htmldiv = htmldiv + '<div id=change_cert_' + record.subid + ' class="abc-radio">';
                if (record.dftYn == "Y") {
                    htmldiv = htmldiv + '<input id=change_cert_' + record.txid + ' type="radio" name="spec-change" checked>';
                } else {
                    htmldiv = htmldiv + '<input id=change_cert_' + record.txid + ' type="radio" name="spec-change">';
                }
                htmldiv = htmldiv + '<label for=change_cert_' + record.txid + '></label>';
                htmldiv = htmldiv + '</div>';
                htmldiv = htmldiv + '</td>';
                if(jsonData.ctestday != undefined) {
                    htmldiv = htmldiv + '<td>' + formatDate(jsonData.ctestday) + '</td>';
                }
                else if(jsonData.ea_exam_time != undefined) {
                    htmldiv = htmldiv + '<td>' + formatDate(jsonData.ea_exam_time) + '</td>';
                }
                htmldiv = htmldiv + '<td>' + jsonData.ea_asset + '</td>';
                htmldiv = htmldiv + '<td>' + jsonData.ex_name + '</td>';
                htmldiv = htmldiv + '<td>' + jsonData.re_point0 + '</td>';
                htmldiv = htmldiv + '<td>' + record.dftYn + '</td>';
                htmldiv = htmldiv + '</tr>';
                $("#spec-change-table").append(htmldiv);
        },

    };
}(window);