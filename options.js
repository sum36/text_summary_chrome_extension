function createForm() {
  chrome.storage.local.get(['clientId', 'clientSecret', 'sent_len'], function(value) {
    let form = document.getElementById('form');

    let div1 = document.createElement('div');
    let textbox1 = document.createElement('input');
    textbox1.type = 'text';
    textbox1.name = 'clientId';
	if (value.clientId != undefined) {
	    textbox1.value = value.clientId;
	}
    div1.innerHTML = 'Client ID<br/>';
    div1.appendChild(textbox1);

    let div2 = document.createElement('div');
    let textbox2 = document.createElement('input');
    textbox2.type = 'text';
    textbox2.name = 'clientSecret';
	if (value.clientSecret != undefined) {
	    textbox2.value = value.clientSecret;
	}
    div2.innerHTML = 'Client Secret<br/>';
    div2.appendChild(textbox2);

    let div3 = document.createElement('div');
    let textbox3 = document.createElement('input');
    textbox3.type = 'text';
    textbox3.name = 'sent_len';
    textbox3.size = '3';
	if (value.sent_len != undefined) {
	    textbox3.value = value.sent_len;
	}
    div3.innerHTML = 'íäèoï∂êî<br/>';
    div3.appendChild(textbox3);

    form.appendChild(div1);
    form.appendChild(div2);
    form.appendChild(div3);

  });
}

createForm();

document.getElementById('optionsSubmit').onclick = function() {

  let clientId = document.getElementsByName('clientId')[0].value;
  let clientSecret = document.getElementsByName('clientSecret')[0].value;
  let sent_len = document.getElementsByName('sent_len')[0].value;
  
  chrome.storage.local.set({'clientId': clientId , 'clientSecret':clientSecret , 'sent_len': sent_len }, function(){
  	console.log('Save');
  	console.log(clientId);
  });
  window.close();
}
