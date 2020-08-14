const contarctAddress = "0xf371c9123e0b2f8ac71875ee57044726c5f019e4", 
	contractABI = [{"constant":false,"inputs":[{"name":"_description","type":"string"}],"name":"createRequest","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_id","type":"uint256"}],"name":"declineRequest","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getRequests","outputs":[{"components":[{"name":"id","type":"uint256"},{"name":"sender","type":"address"},{"name":"description","type":"string"},{"name":"status","type":"uint8"}],"name":"","type":"tuple[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_id","type":"uint256"}],"name":"approveRequest","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}];

function enableEth(){
	if(window.web3){
		window.web3 = new Web3(window.ethereum);
		window.ethereum.enable(); // Requests metamask for permission
		return true;
	}
	alert("Install Metamask First!😅");
	return false;
}

var eApprovalContractInstance;

function init(){
	if(!enableEth()) return; // exit if metamask not installed;

	eApprovalContractInstance = new web3.eth.Contract(contractABI, contarctAddress);
	const getBtn = (val, id, onClickFun) => {
		let btn = $(`<input type="button" value="${val}">`);
		btn.on("click", () => onClickFun(id));
		return btn;
	}

	eApprovalContractInstance.methods.getRequests()
		.call((err, requests) => {
			let table = $("#reqTable");
			
			requests.forEach(req => {

				let tr = $("<tr></tr>");
				req.forEach(attr => {
					tr.append($(`<td>${attr}</td>`));
				});
				tr.append(getBtn("Approve", req[0], approveRequest));
				tr.append(getBtn("Decline", req[0], declineRequest));
				table.append(tr);
			});
		});
}

function createRequest(){
	eApprovalContractInstance.methods.createRequest($("#reqDescription").val())
		.send({
			from: web3.currentProvider.selectedAddress, // This will ask metamask for permisssion
			to: contarctAddress,
			amount: 1,
			gasPrice: "200000000000"
		}).then(txn => {
			console.log(txn);
			location.reload();
		}).catch(console.error);
}

function approveRequest(id){
	eApprovalContractInstance.methods.approveRequest(id)
		.send({
			from: web3.currentProvider.selectedAddress, // This will ask metamask for permisssion
			to: contarctAddress,
			amount: 1,
			gasPrice: "200000000000"
		}).then(txn => {
			console.log(txn);
			location.reload();
		}).catch(console.error);
}

function declineRequest(id){
	eApprovalContractInstance.methods.declineRequest(id)
		.send({
			from: web3.currentProvider.selectedAddress, // This will ask metamask for permisssion
			to: contarctAddress,
			amount: 1,
			gasPrice: "200000000000"
		}).then(txn => {
			console.log(txn);
			location.reload();
		}).catch(console.error);
}
