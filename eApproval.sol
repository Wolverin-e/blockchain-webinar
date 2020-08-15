pragma solidity >=0.4.22 <0.6.0;
pragma experimental ABIEncoderV2;

// To create Request & store it
// To retrieve stored Requests
// To Approve/Decline a Request

contract EApproval{
    
    address owner;
    struct Request{
        uint id;
        address sender;
        string discription;
        uint8 status; // 0: PENDING, 1: DECLINED, 2: APPROVED
    }
    Request[] requests;
    
    constructor() public{
        owner = msg.sender; // no Use case of this line for now
    }
    
    function createRequest(string memory _discription) public{
        Request memory req;
        req.id = requests.length;
        req.sender = msg.sender;
        req.discription = _discription;
        req.status = 0; // PENDING byDefault
        
        requests.push(req);
    }
    
    function getRequests() public view returns(Request[] memory){
        return requests;
    }
    
    function approveRequest(uint id) public{
        requests[id].status = 2;
    }
    
    function declineRequest(uint id) public{
        requests[id].status = 1;
    }
}