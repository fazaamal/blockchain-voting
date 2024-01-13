import { VotingContract } from "./ethers";

const contract = new VotingContract(process.env.PRIVATE_KEY as string);

// contract.addCandidate("Ramadhani Nurfikri").then(res=>console.log(res.hash)); 

VotingContract.getVoteCount('Ramadhani Nurfikri').then(res=>console.log(res));
