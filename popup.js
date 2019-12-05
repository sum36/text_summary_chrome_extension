'use strict';

  let clientId;
  let clientSecret;
  let sent_len;
  let token;
  let json_data;
  let json_data1;
  let docs;
  let result;

   chrome.tabs.executeScript({
        code: "window.getSelection().toString();",
     }, function(selection) {
   		docs = selection[0];
   		if (docs.length == 0){
			document.getElementById("alart").innerHTML = "要約元文章が選択されていません";
			document.getElementById("result").style.display ="none";
        } else {
            getOpt(getToken.bind(null,getRes));
 		}
   });

function getOpt(func){
    chrome.storage.local.get(['clientId', 'clientSecret', 'sent_len'], function(value) {
        if (value.clientId != undefined) {
            clientId = value.clientId;
        }
        if (value.clientSecret != undefined) {
            clientSecret = value.clientSecret;
        }
        if (value.sent_len != undefined) {
            sent_len = value.sent_len;
        }
        json_data = {
            "grantType":"client_credentials",
            "clientId": clientId,
            "clientSecret":clientSecret
        };
        json_data1 = {
            "document": docs,
            "sent_len": Number(sent_len),
        };

	    if (clientId.length == 0 || clientSecret.length == 0 || sent_len.length == 0){
		    document.getElementById("alart").innerHTML = "オプションが設定されていません";
		    document.getElementById("result").style.display ="none";
   	    } else {
		    func();
	    }
    });
};

function getToken(func) {
    $.ajax({
        type: "post",
        url: "https://api.ce-cotoha.com/v1/oauth/accesstokens",
        data: JSON.stringify(json_data),
        contentType: 'application/json',
        dataType: "json",
        success: function (data) {
            token = data.access_token;
            func();
        },
        error: function () {
            document.getElementById("alart").innerHTML = "オプションが正しく設定されていません";
            document.getElementById("result").style.display = "none";
        }
    })
};

function  getRes(data){
    $.ajax({
	    type:"post",
    	url:"https://api.ce-cotoha.com/api/dev/nlp/beta/summary",
    	headers: {
		    'Authorization': 'Bearer ' + token,
		},
    	data:JSON.stringify(json_data1),
    	contentType: 'application/json;charset=UTF-8',
    	dataType: "json",
    	success: function(data) {
    	    result = data.result;
    	    console.log(result);
    	    var results = result.split("。");
		    console.log(results);
			var forShow = docs;
			for (let v of results) {
				console.log(v);
				forShow = replacer( forShow, v, "mark" );
			}
			document.getElementById("output").innerHTML = forShow;
        },
        error: function() {
        }
    });
};

function replacer( str, word , att  ) {
    var SearchString = word;
    SearchString = SearchString.replace(/[\\^$.*+?()[\]{}|]/g, '\\$&');
    var RegularExp = new RegExp( SearchString );
    var ReplaceString = '<span class="' + att + '">'+word+'</span>';
    var ResString = str.replace( RegularExp , ReplaceString );
    return ResString;
};
