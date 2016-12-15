export function renderDancerTitle(dancerProfile) {
  const patronymic = (dancerProfile.patronymic.Valid ? ` ${dancerProfile.patronymic.String} ` : ' ');
  return `${dancerProfile.firstName}${patronymic}${dancerProfile.surname}`;
}

export function formatDate(date) {
  // return `${date.getUTCFullYear()}.${date.getUTCMonth()}.${date.getUTCDay()}`
  return date.toLocaleDateString('ru', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export const keywords = 'хастл, хастл соревнования, хастл конкурсы, хастл турниры, хастл турнир, танцы, танцевальные соревнования, хастл движение, хастл обучение, занятия по хастлу, хастл обучение москва, хастл центр, хастл видео, хастл видео смотреть, хастл дискотеки, хастл движение, хастл это, хастла, хастл танцы, хастл веста, хастл альтернатива, хастл априори, хастл в москве, хастл видео уроки, хастл клуб, хастл клуб движение, хастл музыка, хастл москва, хастл самоучитель, хастл уроки, хастл танцы, хастл фото, hustle, discofox, dancing, hustle moscow, дискофокс';
