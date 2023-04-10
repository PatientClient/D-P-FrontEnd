export const getBadgeColor = (status) => {

  switch (status) {
    case 'NotActive':
      return 'danger';
    case 'InProgress':
      return 'warning'
    case 'Active':
      return 'success';
    default:
      return "danger"
  }
}