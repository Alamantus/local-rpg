import html from 'choo/html';

export default (rollData) => {
  return html`<p>
    ${rollData.user.name} rolled ${ rollData.rolls.length} ${rollData.dieName}<br />
    ${(rollData.rolls.length > 1)
    ? html`<span>${rollData.rolls.join(' + ')}<br /></span>`
    : ''}
    <strong>= ${ rollData.total}</strong>
  </p>`;
}