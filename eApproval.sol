pragma solidity >=0.4.22 <0.6.0;
pragma experimental ABIEncoderV2;

contract EApproval{
    
    address owner;
    struct Request{
        uint8 id;
        address sender;
        string description;
        uint8 status; // 0=>PENDING, 1=>DECLINED, 2=>APPEROVED
    }
    Request[] requests;
    
    // function getOwner() view public returns(address){
    //     return owner;
    // }

    constructor() public{
        owner = msg.sender;
    }
    
    function createRequest(string memory _description) public{
        Request memory newReq;
        newReq.id = uint8(requests.length);
        newReq.sender = msg.sender;
        newReq.description = _description;
        newReq.status = 0;
        
        requests.push(newReq);
    }
    
    function getRequests() view public returns(Request [] memory){
        return requests;
    }
    
    function approveRequest(uint8 _id) public{
        requests[uint(_id)].status = 2;
    }
    
    function declineRequest(uint8 _id) public{
        requests[uint(_id)].status = 1;
    }
}