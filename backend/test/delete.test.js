import { expect } from 'chai';
import axios from 'axios';
import sinon from 'sinon'; // Supposons que vous utilisez Axios pour envoyer des requêtes HTTP

// Fonction à tester
async function deleteUser(userId) {
  try {
    await axios.delete(`/ticket/delete/${userId}`);
    return 'User deleted successfully';
  } catch (error) {
    return 'Error deleting user';
  }
}

// Test
describe('deleteUser', () => {
  it('should delete user successfully', async () => {
    // Création du stub pour axios.delete
    const axiosDeleteStub = sinon.stub(axios, 'delete').resolves({ data: 'User deleted successfully' });

    // Appel de la fonction à tester
    const result = await deleteUser('65e88c3e9e4fa87c96bf0edc');

    // Assertion
    expect(result).to.equal('User deleted successfully');

    // Restauration du stub
    axiosDeleteStub.restore();
  });
});
