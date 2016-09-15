export function renderDancerTitle(dancerProfile) {
  const patronymic = (dancerProfile.patronymic.Valid ? ` ${dancerProfile.patronymic.String} ` : ' ');
  return `${dancerProfile.firstName}${patronymic}${dancerProfile.surname}`;
}
