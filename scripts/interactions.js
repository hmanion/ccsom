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
    if (!ladderShell || !data.escalation || !Array.isArray(data.escalation.ladder)) return;

    ladderShell.innerHTML = '';

    data.escalation.ladder.forEach(function (step) {
      var line = document.createElement('article');
      line.className = 'ladder-line';

      var h3 = document.createElement('h3');
      h3.textContent = step.label;

      var pWhen = document.createElement('p');
      pWhen.innerHTML = '<strong>When:</strong> ' + step.when;

      var pAction = document.createElement('p');
      pAction.innerHTML = '<strong>Action:</strong> ' + step.action;

      line.appendChild(h3);
      line.appendChild(pWhen);
      line.appendChild(pAction);
      ladderShell.appendChild(line);
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
        withoutPanel.classList.add('hidden');
        withoutPanel.classList.remove('muted');
        withPanel.classList.remove('hidden');
        withPanel.classList.remove('muted');
      } else {
        withoutPanel.classList.remove('hidden');
        withoutPanel.classList.remove('muted');
        withPanel.classList.add('hidden');
        withPanel.classList.remove('muted');
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

    function buildPersonCell(names) {
      var td = document.createElement('td');
      var list = document.createElement('div');
      list.className = 'name-list';
      if (!names || !names.length) {
        var empty = document.createElement('span');
        empty.className = 'matrix-empty';
        empty.textContent = '-';
        td.appendChild(empty);
        return td;
      }
      names.forEach(function (name) {
        var chip = document.createElement('span');
        chip.className = 'name-pill';
        chip.textContent = name;
        list.appendChild(chip);
      });
      td.appendChild(list);
      return td;
    }

    [
      [
        'Writers',
        (data.peopleMatrix.writers && data.peopleMatrix.writers.junior) || [],
        (data.peopleMatrix.writers && data.peopleMatrix.writers.midLevel) || [],
        (data.peopleMatrix.writers && data.peopleMatrix.writers.senior) || []
      ],
      [
        'Internal SME',
        (data.peopleMatrix.internalSME && data.peopleMatrix.internalSME.junior) || [],
        (data.peopleMatrix.internalSME && data.peopleMatrix.internalSME.midLevel) || [],
        (data.peopleMatrix.internalSME && data.peopleMatrix.internalSME.senior) || []
      ]
    ].forEach(function (row) {
      var tr = document.createElement('tr');
      var rowHead = document.createElement('th');
      rowHead.scope = 'row';
      rowHead.className = 'matrix-rowhead';
      rowHead.textContent = row[0];
      tr.appendChild(rowHead);

      tr.appendChild(buildPersonCell(row[1]));
      tr.appendChild(buildPersonCell(row[2]));
      tr.appendChild(buildPersonCell(row[3]));
      matrix.appendChild(tr);
    });
  }

  function buildClusterData(mode, peopleMatrix) {
    if (!peopleMatrix) return [];

    var writers = peopleMatrix.writers || {};
    var sme = peopleMatrix.internalSME || {};

    function dedupeOrdered(names) {
      var seen = Object.create(null);
      var out = [];
      (names || []).forEach(function (name) {
        if (!name || seen[name]) return;
        seen[name] = true;
        out.push(name);
      });
      return out;
    }

    if (mode === 'sme') {
      return [
        {
          label: 'Standard',
          names: dedupeOrdered(
            []
              .concat(writers.junior || [])
              .concat(writers.midLevel || [])
              .concat(writers.senior || [])
          )
        },
        {
          label: 'Internal SME',
          names: dedupeOrdered(
            []
              .concat(sme.junior || [])
              .concat(sme.midLevel || [])
              .concat(sme.senior || [])
          )
        }
      ];
    }

    if (mode === 'role') {
      var roleGroups = data.peopleRoleGroups || {};
      return [
        {
          label: 'Journalist',
          names: dedupeOrdered(roleGroups.journalist || [])
        },
        {
          label: 'Evangelist',
          names: dedupeOrdered(roleGroups.evangelist || [])
        },
        {
          label: 'Associate Editor',
          names: dedupeOrdered(roleGroups.associateEditor || [])
        }
      ];
    }

    if (mode === 'publication') {
      var publicationGroups = data.peoplePublicationGroups || {};
      return [
        {
          label: 'CX Today',
          names: dedupeOrdered(publicationGroups.cxToday || [])
        },
        {
          label: 'UC Today',
          names: dedupeOrdered(publicationGroups.ucToday || [])
        }
      ];
    }

    return [
      {
        label: 'Junior',
        names: dedupeOrdered([].concat(writers.junior || []).concat(sme.junior || []))
      },
      {
        label: 'Mid-level',
        names: dedupeOrdered([].concat(writers.midLevel || []).concat(sme.midLevel || []))
      },
      {
        label: 'Senior',
        names: dedupeOrdered([].concat(writers.senior || []).concat(sme.senior || []))
      }
    ];
  }

  function renderPeopleClusters(selectedModes) {
    var container = document.getElementById('peopleClusterGroups');
    if (!container) return;

    container.innerHTML = '';

    if (!selectedModes || !selectedModes.length) {
      var emptySelection = document.createElement('p');
      emptySelection.className = 'cluster-empty';
      emptySelection.textContent = 'Select at least one grouping.';
      container.appendChild(emptySelection);
      return;
    }

    function intersectByOrder(a, b) {
      var setB = Object.create(null);
      (b || []).forEach(function (name) {
        setB[name] = true;
      });
      var out = [];
      var seen = Object.create(null);
      (a || []).forEach(function (name) {
        if (setB[name] && !seen[name]) {
          seen[name] = true;
          out.push(name);
        }
      });
      return out;
    }

    function createClusterCard(labels, names) {
      var card = document.createElement('article');
      card.className = 'cluster-group';

      var hub = document.createElement('div');
      hub.className = 'cluster-hub';
      labels.forEach(function (label) {
        var pill = document.createElement('span');
        pill.className = 'cluster-group-pill';
        pill.textContent = label;
        hub.appendChild(pill);
      });

      var members = document.createElement('div');
      members.className = 'name-list cluster-members';
      names.forEach(function (name) {
        var chip = document.createElement('span');
        chip.className = 'name-pill';
        chip.textContent = name;
        members.appendChild(chip);
      });

      card.appendChild(hub);
      card.appendChild(members);
      return card;
    }

    if (selectedModes.length === 1) {
      var groups = buildClusterData(selectedModes[0], data.peopleMatrix).filter(function (group) {
        return group.names && group.names.length;
      });
      if (!groups.length) {
        var noGroups = document.createElement('p');
        noGroups.className = 'cluster-empty';
        noGroups.textContent = 'No people available for the selected grouping.';
        container.appendChild(noGroups);
        return;
      }

      groups.forEach(function (group) {
        container.appendChild(createClusterCard([group.label], group.names));
      });
      return;
    }

    var axisX = selectedModes[0];
    var axisY = selectedModes[1];

    var xGroups = buildClusterData(axisX, data.peopleMatrix).filter(function (group) {
      return group.names && group.names.length;
    });
    var yGroups = buildClusterData(axisY, data.peopleMatrix).filter(function (group) {
      return group.names && group.names.length;
    });

    if (!xGroups.length || !yGroups.length) {
      var empty = document.createElement('p');
      empty.className = 'cluster-empty';
      empty.textContent = 'No people available for the selected groupings.';
      container.appendChild(empty);
      return;
    }

    var foundAny = false;
    yGroups.forEach(function (yGroup) {
      xGroups.forEach(function (xGroup) {
        var intersection = intersectByOrder(xGroup.names, yGroup.names);
        if (!intersection.length) return;
        foundAny = true;
        container.appendChild(createClusterCard([yGroup.label, xGroup.label], intersection));
      });
    });

    if (!foundAny) {
      var none = document.createElement('p');
      none.className = 'cluster-empty';
      none.textContent = 'No overlapping people for the selected pair.';
      container.appendChild(none);
    }
  }

  function initPeopleClusters() {
    var buttons = Array.prototype.slice.call(document.querySelectorAll('[data-cluster-option]'));
    if (!buttons.length || !data.peopleMatrix) return;

    var selected = ['seniority'];

    function setButtonState() {
      buttons.forEach(function (btn) {
        var mode = btn.getAttribute('data-cluster-option');
        var isActive = selected.indexOf(mode) !== -1;
        btn.classList.toggle('active', isActive);
        btn.setAttribute('aria-pressed', String(isActive));
      });
    }

    function update() {
      setButtonState();
      renderPeopleClusters(selected.slice(0, 2));
    }

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var mode = btn.getAttribute('data-cluster-option');
        var idx = selected.indexOf(mode);

        if (idx !== -1) {
          if (selected.length === 1) return;
          selected.splice(idx, 1);
          update();
          return;
        }

        if (selected.length >= 2) {
          selected.shift();
        }
        selected.push(mode);
        update();
      });
    });

    update();
  }

  document.addEventListener('DOMContentLoaded', function () {
    initSupportLevels();
    initRolesRender();
    initGovernanceRender();
    initEscalationRender();
    initTargetStateRender();
    initPeopleMatrix();
    initPeopleClusters();
  });
})();
