export function renderDancerTitle(dancerProfile) {
  const patronymic = (dancerProfile.patronymic.Valid ? ` ${dancerProfile.patronymic.String} ` : ' ');
  return `${dancerProfile.firstName}${patronymic}${dancerProfile.surname}`;
}

export function formatDate(date) {
  // return `${date.getUTCFullYear()}.${date.getUTCMonth()}.${date.getUTCDay()}`
  return date.toLocaleDateString('ru', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
}
