const ethEnabled = () => {
	if (window.web3) {
		window.web3 = new Web3(window.ethereum);
		window.ethereum.enable();
		return true;
	}
	return false;
}

const contractAddress = "0x8a486a8c1cb3a59b698b3c31ae9758602844c0e1",
	contractABI = [{"constant":false,"inputs":[{"name":"_description","type":"string"}],"name":"createRequest","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getRequests","outputs":[{"components":[{"name":"id","type":"uint8"},{"name":"sender","type":"address"},{"name":"description","type":"string"},{"name":"status","type":"uint8"}],"name":"","type":"tuple[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_id","type":"uint8"}],"name":"approveRequest","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_id","type":"uint8"}],"name":"declineRequest","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}];
var eApprovalContract;

function init(){
	if(!ethEnabled()) return;
	
	eApprovalContract = new web3.eth.Contract(contractABI, contractAddress);
	
	eApprovalContract.methods.getRequests().call( (err, reqs) => {
		let requestsTable = $("#requests");
		reqs.forEach(req => {
			let tr = $("<tr></tr>");
			req.forEach(attr => {
				tr.append($(`<td>${attr}</td>`));
			});
			let getButton = (val, id, onClkFun) => {
				let btn = $(`<input type="button" value=${val}>`);
				btn.data({'id': id});
				btn.on("click", () => onClkFun(id));
				return btn;
			};
			tr.append(getButton("Approve", req[0], approveRequest));
			tr.append(getButton("Decline", req[0], declineRequest));
			requestsTable.append(tr);
		});
	});
}

function createReq(){
	eApprovalContract.methods.createRequest($("#reqDescription").val())
		.send({
			from: web3.currentProvider.selectedAddress, // this will enforce account selection for metamask
			to: contractAddress,
			amount: 1,
			gasPrice: "20000000000"
		})
		.then(txHash => {
			console.log(txHash);
			location.reload();
		})
		.catch(err => console.error(err));
}

function approveRequest(id){
	eApprovalContract.methods.approveRequest(id)
		.send({
			from: web3.currentProvider.selectedAddress, // this will enforce account selection for metamask
			to: contractAddress,
			amount: 1,
			gasPrice: "20000000000"
		})
		.then(txHash => {
			console.log(txHash);
			location.reload();
		})
		.catch(err => console.error(err));
}

function declineRequest(id){
	eApprovalContract.methods.declineRequest(id)
		.send({
			from: web3.currentProvider.selectedAddress, // this will enforce account selection for metamask
			to: contractAddress,
			amount: 1,
			gasPrice: "20000000000"
		})
		.then(txHash => {
			console.log(txHash);
			location.reload();
		})
		.catch(err => console.error(err));
}