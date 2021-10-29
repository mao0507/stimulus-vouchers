//宣告
Mao = {
    //協助提示
    help: function() {
        console.clear();
        console.log('分成兩個大項，有驗證功能、常用工具');
        console.log('驗證功能包含了 數字驗證、英文數字驗證、身分證驗證、Email驗證、市內電話驗證、手機格式驗證');
        console.log('常用工具包含 取得網址參數');
    },
    //驗證功能
    verify: {
        //數字驗證
        NumberVerify: function(str) {
            let regExp = /^[0-9]+$/;
            if (regExp.test(str)) {
                return true;
            } else {
                return false;
            }
        },
        //僅接受英文及數字驗證
        EnglishNumberVerify: function(str) {
            let regExp = /^[0-9a-zA-Z]+$/;
            if (regExp.test(str)) {
                return true;
            } else {
                return false;
            }
        },
        //身分證驗證
        TaiwanIdVerify: function(value) {
            //參考 https: //hackmd.io/@CynthiaChuang/CheckUID

            //基本預設資料
            let 編號規則 = {
                區域碼: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
                區域名: ['臺北市', '臺中市', '基隆市', '臺南市', '高雄市', '新北市', '宜蘭縣', '桃園縣', '嘉義市', '新竹縣', '苗栗縣', '臺中縣', '南投縣', '彰化縣', '新竹市', '雲林縣', '嘉義縣', '臺南縣', '高雄縣', '屏東縣', '花蓮縣', '臺東縣', '金門縣', '澎湖縣', '陽明山管理局', '連江縣'],
                縣市代碼轉換值: ['10', '11', '12', '13', '14', '15', '16', '17', '34', '18', '19', '20', '21', '22', '35', '23', '24', '25', '26', '27', '28', '29', '32', '30', '31', '33']
            };
            //權重參數
            let 權重 = [1, 9, 8, 7, 6, 5, 4, 3, 2, 1, 1];

            //轉為大寫
            let 身分證號碼 = value.toUpperCase();

            //檢查身分證
            var 檢查身分證號碼 = /^([A-Z]{1})([0-9]{9})$/;
            if (!檢查身分證號碼.test(身分證號碼)) {
                return false;
            }
            //檢查區域碼
            var 檢查區域碼 = 編號規則.區域碼.indexOf(身分證號碼.charAt(0));
            if (檢查區域碼 == -1) {
                return false;
            }
            //檢查性別
            var 性別 = '';
            switch (身分證號碼.charAt(1)) {
                case '1':
                    性別 = '男性';
                    break;
                case '2':
                    性別 = '女性';
                    break;
                default:
                    return false;
            }

            //檢查身分證權重  
            var 檢查身分證權重 = 編號規則.縣市代碼轉換值[檢查區域碼] + 身分證號碼.substring(1, 10);
            var 總和 = 0;
            for (var i = 0; i < 11; i++) {
                總和 += 權重[i] * parseInt(檢查身分證權重.charAt(i));
            }
            //若總和為 10 的倍數，即為有效的驗證碼。
            if (總和 % 10 == 0) {
                return true;
            } else {
                return false;
            }
        },
        //Email驗證
        EmailVerify: function(value) {
            let reg = /^[^\s]+@[^\s]+\.[^\s]{2,3}$/;
            if (reg.test(email)) {
                return true;
            } else {
                return false;
            }
        },
        //市內電話驗證
        TelephoneVerify: function(value) {
            let regExp = /^0\d{1,3}-\d{6,10}$/;
            if (regExp.test(tel)) {
                return true;
            } else {
                return false;
            }
        },
        //手機格式驗證
        PhoneVerify: function(value) {
            let regExp = /^09\d{8}$/;
            if (regExp.test(tel)) {
                return true;
            } else {
                return false;
            }
        }
    },
    //常用工具
    tools: {
        //取得網址參數
        GetUrlValue: function(key) {
            let 網址參數 = {};
            let 網址 = location.href
            if (網址 != null || 網址 != undefined || 網址 != '') {
                //將網址切割，保留問號以後字串，順便切除 & 
                let 網址變數 = 網址.slice(網址.indexOf('?') + 1).split('&')
                for (let i = 0; i < 網址變數.length; i++) {
                    //取出片段
                    let 切割後字串 = 網址變數[i];
                    //將片段去除 = 符號
                    let str = 切割後字串.split('=');
                    //取出 Key值 跟 Value值
                    let Key值 = str[0];
                    let Value值 = 切割後字串.substr((Key值 + '=').length);
                    //將Key值與Value值組合
                    網址參數[Key值] = Value值.replace(/#/g, '');
                }
            }
            //回傳
            return 網址參數[key] ? 網址參數[key] : null;
        },
    }

}