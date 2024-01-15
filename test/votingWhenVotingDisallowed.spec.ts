import { VotingContract } from '../src/lib/ethers';

test('Voting with approval but already voted should revert', async () => {
  // Enter a private key of admin wallet
  const contract = new VotingContract('PRIVATE_KEY');
  await contract.toggleVoting();

  try{
    // Enter a private key of a wallet that has not yet voted but approved
    await (new VotingContract('PRIVATE_KEY')).vote('A');
  }catch(e:any){
    expect(e).toHaveProperty('info');
    expect(e.info).toHaveProperty('error');
    expect(e.info.error).toHaveProperty('data');
    expect(e.info.error.data).toHaveProperty('reason');
    expect(e.info.error.data.reason).toEqual('Voting is not allowed at the moment');
  }
})