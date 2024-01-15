import { VotingContract } from '../src/lib/ethers';

test('Voting with approval but already voted should revert', async () => {
  // Enter a private key of a wallet that has already voted
  const contract = new VotingContract('PRIVATE_KEY')

  try{
    await contract.vote('A');
  }catch(e:any){
    expect(e).toHaveProperty('info');
    expect(e.info).toHaveProperty('error');
    expect(e.info.error).toHaveProperty('data');
    expect(e.info.error.data).toHaveProperty('reason');
    expect(e.info.error.data.reason).toEqual('You have already voted');
  }
})