import { VotingContract } from '../src/lib/ethers';

test('Voting without approval should revert', async () => {
  // Enter a private key of a wallet that has not yet been approved
  const contract = new VotingContract('PRIVATE_KEY')

  try{
    await contract.vote('A');
  }catch(e:any){
    expect(e).toHaveProperty('info');
    expect(e.info).toHaveProperty('error');
    expect(e.info.error).toHaveProperty('data');
    expect(e.info.error.data).toHaveProperty('reason');
    expect(e.info.error.data.reason).toEqual('You are not approved to vote');
  }
})