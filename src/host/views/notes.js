import html from 'choo/html';
import moment from 'moment';

import { NotesController } from '../controllers/NotesController';

export default (state, emit) => {
  const controller = new NotesController(state);

  const hasPreviousPage = controller.state.currentPage - 1 >= 0;
  const previousPage = hasPreviousPage >= 0 ? controller.state.currentPage - 1 : 0;
  const hasNextPage = controller.state.currentPage + 1 < controller.numberOfPages;
  const nextPage = hasNextPage ? controller.state.currentPage + 1 : controller.numberOfPages - 1;

  const view = html`<div class="columns">
    <div class="column is-one-quarter">
      <nav class="panel">
        <h4 class="panel-heading">
          Notes
        </h4>
        <div class="panel-block">
          <p class="control has-icons-left">
            <input class="input is-small" type="text" placeholder="search">
            <span class="icon is-small is-left">
              <i class="fa fa-search"></i>
            </span>
          </p>
        </div>
        ${
          controller.currentPageNotes.map(note => {
            const noteClass = `panel-block${ controller.state.displayedNote === note.index ? ' is-active' : '' }`;
            return html`<a class=${ noteClass } onclick=${ () => controller.open(emit, note.index) }>
              ${ note.name }
              <span class="tag">${ moment(note.updated).calendar() }</span>
            </a>`;
          })
        }
      </nav>
      <nav class="pagination is-small" role="navigation" aria-label="pagination">
        <ul class="pagination-list">
          <li>
            <a class="pagination-link" disabled=${ controller.state.currentPage === 0 }
              aria-label="Goto page 1"
              onclick=${ () => controller.goToPage(emit, 0) }>
              First
            </a>
          </li>
          <li>
            <a class="pagination-link" disabled=${ !hasPreviousPage }
              aria-label=${ 'Goto page ' + previousPage.toString() }
              onclick=${ () => controller.goToPage(emit, previousPage) }>
              Prev
            </a>
          </li>
          <li>
            <span class="pagination-ellipsis">${ controller.state.currentPage + 1 } of ${ controller.numberOfPages }</span>
          </li>
          <li>
            <a class="pagination-link" disabled=${ !hasNextPage }
              aria-label=${ 'Goto page ' + nextPage.toString() }
              onclick=${ () => controller.goToPage(emit, nextPage) }>
              Next
            </a>
          </li>
          <li>
            <a class="pagination-link" disabled=${ !hasNextPage }
              aria-label=${ 'Goto page ' + controller.numberOfPages.toString() }
              onclick=${ () => controller.goToPage(emit, controller.numberOfPages - 1) }>
              Last
            </a>
          </li>
        </ul>
      </nav>
    </div>

    <div class="column is-three-quarters">
      ${
        controller.state.displayedNote !== null
        ? html`<div>
          <div class="field">
            <div class="control">
              <input class="input" placeholder="New Note" value=${ controller.currentNote.name }
                onchange=${ event => controller.updateTitle(emit, event) } />
            </div>
          </div>
          <div class="field">
            <div class="control">
              <textarea class="textarea" onchange=${ event => controller.updateNote(emit, event) }>${ controller.currentNote.content }</textarea>
            </div>
          </div>
          <div class="field is-grouped">
            <div class="control">
              <a onclick=${ () => controller.close(emit) }><button class="button is-text">Close</button></a>
            </div>
          </div>
        </div>`
        : html`<div>
          <a class="button is-success" onclick=${ () => {
            const newNote = controller.create('New Note');
            controller.open(emit, newNote);
          }}>
            <span class="icon">
              <i class="fa fa-plus"></i>
            </span>
            <span>Add Note</span>
          </a>
        </div>`
      }
    </div>
  </div>`;

  return view;
}