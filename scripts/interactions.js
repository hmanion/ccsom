(function () {
  var data = window.CCSOM_DATA || {};

  function createList(items) {
    var ul = document.createElement('ul');
    ul.className = 'list-clean';
    (items || []).forEach(function (item) {
      var li = document.createElement('li');
      li.textContent = item;
      ul.appendChild(li);
    });
    return ul;
  }

  function setListContentById(id, items) {
    var target = document.getElementById(id);
    if (!target) return;
    target.innerHTML = '';
    (items || []).forEach(function (item) {
      var li = document.createElement('li');
      li.textContent = item;
      target.appendChild(li);
    });
  }

  function initSupportLevels() {
    var container = document.getElementById('supportLevelContainer');
    if (!container || !Array.isArray(data.supportLevels)) return;

    container.innerHTML = '';
    data.supportLevels.forEach(function (level) {
      var article = document.createElement('article');
      article.className = 'level-card';
      article.setAttribute('data-level-id', level.id);

      var header = document.createElement('div');
      header.className = 'level-header';
      var h3 = document.createElement('h3');
      h3.textContent = level.name;
      var badge = document.createElement('span');
      badge.className = 'badge ' + level.id;
      badge.textContent = level.id.replace('-', ' ');
      header.appendChild(h3);
      header.appendChild(badge);

      var criteriaTitle = document.createElement('h4');
      criteriaTitle.textContent = 'Default Criteria';
      var criteriaList = createList(level.defaultCriteria);

      var rolesTitle = document.createElement('h4');
      rolesTitle.textContent = 'Roles';
      var roleLines = document.createElement('ul');
      roleLines.className = 'role-lines';
      (level.roles || []).forEach(function (entry) {
        var li = document.createElement('li');
        var role = document.createElement('span');
        role.className = 'role-name';
        role.textContent = entry.role;
        var assignee = document.createElement('span');
        assignee.className = 'role-assignee';
        assignee.textContent = entry.assignee;
        li.appendChild(role);
        li.appendChild(assignee);
        roleLines.appendChild(li);
      });

      var qaTitle = document.createElement('h4');
      qaTitle.textContent = 'QA Expectation';
      var qa = document.createElement('p');
      qa.textContent = level.qaModel;

      article.appendChild(header);
      article.appendChild(criteriaTitle);
      article.appendChild(criteriaList);
      article.appendChild(rolesTitle);
      article.appendChild(roleLines);
      article.appendChild(qaTitle);
      article.appendChild(qa);

      container.appendChild(article);
    });
  }

  function initAccordions() {
    var accordions = document.querySelectorAll('[data-accordion]');
    accordions.forEach(function (root) {
      if (root.getAttribute('data-accordion-bound') === 'true') return;
      root.setAttribute('data-accordion-bound', 'true');

      var trigger = root.querySelector('button');
      var panel = root.querySelector('.panel');
      if (!trigger || !panel) return;

      if (!panel.hasAttribute('hidden')) {
        panel.setAttribute('hidden', '');
      }
      panel.style.display = 'none';
      trigger.setAttribute('aria-expanded', 'false');

      trigger.addEventListener('click', function () {
        var isOpen = trigger.getAttribute('aria-expanded') !== 'true';
        trigger.setAttribute('aria-expanded', String(isOpen));
        root.classList.toggle('open', isOpen);
        if (isOpen) {
          panel.removeAttribute('hidden');
          panel.style.display = 'block';
        } else {
          panel.setAttribute('hidden', '');
          panel.style.display = 'none';
        }
      });
    });
  }

  function initRolesRender() {
    var container = document.getElementById('roleAccordionContainer');
    if (!container || !Array.isArray(data.roles)) return;

    container.innerHTML = '';
    data.roles.forEach(function (role, index) {
      var card = document.createElement('article');
      card.className = 'accordion';
      card.setAttribute('data-accordion', '');

      var button = document.createElement('button');
      button.type = 'button';
      var panelId = 'role-panel-' + index;
      button.setAttribute('aria-expanded', 'false');
      button.setAttribute('aria-controls', panelId);
      button.textContent = role.title;

      var panel = document.createElement('div');
      panel.className = 'panel';
      panel.id = panelId;
      panel.hidden = true;

      var summary = document.createElement('p');
      summary.textContent = role.summary;
      panel.appendChild(summary);

      var titleA = document.createElement('h4');
      titleA.textContent = 'Responsibilities';
      panel.appendChild(titleA);
      panel.appendChild(createList(role.responsibilities));

      var titleB = document.createElement('h4');
      titleB.textContent = 'Rules';
      panel.appendChild(titleB);
      panel.appendChild(createList(role.rules));

      card.appendChild(button);
      card.appendChild(panel);
      container.appendChild(card);
    });

    initAccordions();
  }

  function initGovernanceRender() {
    var prep = document.getElementById('prepList');
    var rhythm = document.getElementById('rhythmList');
    var qa = document.getElementById('qaCoverageList');
    var drafting = document.getElementById('draftingTableBody');

    if (prep) setListContentById('prepList', data.governance && data.governance.prep);
    if (rhythm) setListContentById('rhythmList', data.governance && data.governance.weeklyRhythm);
    if (qa) setListContentById('qaCoverageList', data.governance && data.governance.qaCoverage);

    if (drafting && data.governance && Array.isArray(data.governance.draftingBySeniority)) {
      drafting.innerHTML = '';
      data.governance.draftingBySeniority.forEach(function (entry) {
        var tr = document.createElement('tr');
        var tdLevel = document.createElement('td');
        tdLevel.textContent = entry.level;
        var tdModel = document.createElement('td');
        tdModel.textContent = entry.model;
        tr.appendChild(tdLevel);
        tr.appendChild(tdModel);
        drafting.appendChild(tr);
      });
    }
  }

  function initEscalationRender() {
    var criteria = document.getElementById('escalationCriteria');
    if (criteria && data.escalation) {
      setListContentById('escalationCriteria', data.escalation.criteria);
    }

    var ladderShell = document.getElementById('ladderSteps');
    var detail = document.getElementById('ladderDetail');
    if (!ladderShell || !detail || !data.escalation || !Array.isArray(data.escalation.ladder)) return;

    ladderShell.innerHTML = '';

    function updateDetail(step) {
      detail.innerHTML = '';
      var h4 = document.createElement('h4');
      h4.textContent = step.label;
      var p1 = document.createElement('p');
      p1.innerHTML = '<strong>When:</strong> ' + step.when;
      var p2 = document.createElement('p');
      p2.innerHTML = '<strong>Action:</strong> ' + step.action;
      detail.appendChild(h4);
      detail.appendChild(p1);
      detail.appendChild(p2);
    }

    data.escalation.ladder.forEach(function (step, index) {
      var button = document.createElement('button');
      button.className = 'ladder-step';
      button.type = 'button';
      button.setAttribute('data-ladder-step', step.id);
      button.textContent = step.label;
      button.addEventListener('click', function () {
        Array.prototype.slice.call(ladderShell.querySelectorAll('.ladder-step')).forEach(function (item) {
          item.classList.remove('active');
        });
        button.classList.add('active');
        updateDetail(step);
      });
      ladderShell.appendChild(button);
      if (index === 0) {
        button.classList.add('active');
        updateDetail(step);
      }
    });

    var recurring = document.getElementById('recurringIssuesList');
    if (recurring) {
      setListContentById('recurringIssuesList', data.escalation.recurringIssues);
    }
  }

  function initTargetStateRender() {
    var without = document.getElementById('withoutModelList');
    var withModel = document.getElementById('withModelList');
    var midQ2 = document.getElementById('midQ2List');

    if (without) setListContentById('withoutModelList', data.targetState && data.targetState.withoutModel);
    if (withModel) setListContentById('withModelList', data.targetState && data.targetState.withModel);
    if (midQ2) setListContentById('midQ2List', data.targetState && data.targetState.midQ2);

    var toggles = document.querySelectorAll('[data-compare-toggle]');
    var withoutPanel = document.querySelector('[data-panel="without"]');
    var withPanel = document.querySelector('[data-panel="with"]');
    if (!toggles.length || !withoutPanel || !withPanel) return;

    function applyMode(mode) {
      if (mode === 'after') {
        withoutPanel.classList.add('muted');
        withPanel.classList.remove('muted');
      } else {
        withoutPanel.classList.remove('muted');
        withPanel.classList.add('muted');
      }
    }

    toggles.forEach(function (toggle) {
      toggle.addEventListener('change', function () {
        if (toggle.type === 'checkbox') {
          applyMode(toggle.checked ? 'after' : 'before');
          return;
        }
        if (toggle.checked) applyMode(toggle.value);
      });
    });

    applyMode('before');
  }

  function initPeopleMatrix() {
    var matrix = document.getElementById('peopleMatrixBody');
    if (!matrix || !data.peopleMatrix) return;

    matrix.innerHTML = '';

    [
      [
        'Writers',
        (data.peopleMatrix.writers && data.peopleMatrix.writers.junior || []).join(', '),
        (data.peopleMatrix.writers && data.peopleMatrix.writers.midLevel || []).join(', '),
        (data.peopleMatrix.writers && data.peopleMatrix.writers.senior || []).join(', ')
      ],
      [
        'Internal SME',
        (data.peopleMatrix.internalSME && data.peopleMatrix.internalSME.junior || []).join(', '),
        (data.peopleMatrix.internalSME && data.peopleMatrix.internalSME.midLevel || []).join(', '),
        (data.peopleMatrix.internalSME && data.peopleMatrix.internalSME.senior || []).join(', ')
      ]
    ].forEach(function (row) {
      var tr = document.createElement('tr');
      row.forEach(function (cellValue) {
        var td = document.createElement('td');
        td.textContent = cellValue || '-';
        tr.appendChild(td);
      });
      matrix.appendChild(tr);
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initSupportLevels();
    initRolesRender();
    initGovernanceRender();
    initEscalationRender();
    initTargetStateRender();
    initPeopleMatrix();
  });
})();
