import api from './api';

const LoanService = {
  getAll: () => api.get('/loans'),
  getByUser: (userId) => api.get(`/loans/user/${userId}`),
  create: (loanData) => api.post('/loans', loanData),
  returnBook: (loanId) => api.patch(`/loans/${loanId}/return`),
};

export default LoanService;