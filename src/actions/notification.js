export function createNotification(payload) {
  return {
    type: 'CREATE_NOTIFICATION',
    payload,
  };
}

export function deleteNotification() {
  return {
    type: 'DELETE_NOTIFICATION',
  };
}
