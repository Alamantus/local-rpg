import html from 'choo/html';

export default (state, emit) => {
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
        <a class="panel-block is-active">
          Game Notes
          <span class="tag">2017-10-18</span>
        </a>
        <a class="panel-block">
          Character Notes
          <span class="tag">2017-10-18</span>
        </a>
        <a class="panel-block">
          Rule Notes
          <span class="tag">2017-10-18</span>
        </a>
        <a class="panel-block">
          Other Notes
          <span class="tag">2017-10-18</span>
        </a>
      </nav>
      <nav class="pagination is-small" role="navigation" aria-label="pagination">
        <ul class="pagination-list">
          <li>
            <a class="pagination-link" aria-label="Goto page 1">1</a>
          </li>
          <li>
            <span class="pagination-ellipsis">...</span>
          </li>
          <li>
            <a class="pagination-link" aria-label="Goto page 45">45</a>
          </li>
          <li>
            <a class="pagination-link is-current" aria-label="Page 46" aria-current="page">46</a>
          </li>
          <li>
            <a class="pagination-link" aria-label="Goto page 47">47</a>
          </li>
          <li>
            <span class="pagination-ellipsis">...</span>
          </li>
          <li>
            <a class="pagination-link" aria-label="Goto page 86">86</a>
          </li>
        </ul>
      </nav>
    </div>
    <div class="column is-three-quarters">
      <div class="field">
        <div class="control">
          <input class="input" placeholder="New Note" value="" />
        </div>
      </div>
      <div class="field">
        <div class="control">
          <textarea class="textarea"></textarea>
        </div>
      </div>
    </div>
  </div>`;

  return view;
}