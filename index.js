const contractAddress = "0x1146f48afbcfd93b2883f8b15c267c1678e34a67", 
	contractABI = [{"constant":false,"inputs":[{"name":"_des","type":"string"}],"name":"createRequest","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_id","type":"uint256"}],"name":"declineRequest","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getRequests","outputs":[{"components":[{"name":"id","type":"uint256"},{"name":"sender","type":"address"},{"name":"description","type":"string"},{"name":"status","type":"uint8"}],"name":"","type":"tuple[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_id","type":"uint256"}],"name":"approveRequest","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}];

let eApprovalContractInstance;

function enableEth(){
	if(window.web3){
		window.web3 = new Web3(window.ethereum);
		window.ethereum.enable(); // this will ask for metamask's permission
		return true;
	} else {
		alert("Install metamsk!!🤨");
		return false;
	}
}

function init(){
	if(!enableEth()) return;

	eApprovalContractInstance = new web3.eth.Contract(contractABI, contractAddress);

	eApprovalContractInstance.methods.getRequests()
		.call((err, requests) => {
			let table = $("#reqTable");
			let getBtn = (val, id, onClkFun) => {
				let btn = $(`<input type="button" value="${val}">`);
				btn.on("click", () => onClkFun(id));
				return btn;
			}

			requests.forEach(req => {
				let tr = $("<tr></tr>");

				req.forEach(attr => {
					tr.append($(`<td>${attr}</td>`));
				});

				tr.append(getBtn("Approve", req[0], approveRequest));
				tr.append(getBtn("Decline", req[0], declineRequest));
				table.append(tr);
			})
		})
}

function createRequest(){
	const des = $("#reqDescription").val();

	eApprovalContractInstance.methods.createRequest(des)
		.send({
			from: web3.currentProvider.selectedAddress, 
			to: contractAddress, 
			amount: 1, 
			gasPrice: "2000000000"
		})
		.then(txHash => {
			console.log(txHash);
			location.reload();
		})
		.catch(console.log);
}

function approveRequest(id){

	eApprovalContractInstance.methods.approveRequest(id)
		.send({
			from: web3.currentProvider.selectedAddress, 
			to: contractAddress, 
			amount: 1, 
			gasPrice: "2000000000"
		})
		.then(txHash => {
			console.log(txHash);
			location.reload();
		})
		.catch(console.log);
}

function declineRequest(id){

	eApprovalContractInstance.methods.declineRequest(id)
		.send({
			from: web3.currentProvider.selectedAddress, 
			to: contractAddress, 
			amount: 1, 
			gasPrice: "2000000000"
		})
		.then(txHash => {
			console.log(txHash);
			location.reload();
		})
		.catch(console.log);
}
