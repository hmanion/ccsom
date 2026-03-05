(function () {
  var data = window.CCSOM_DATA || {};

  function setText(id, value) {
    var el = document.getElementById(id);
    if (!el || typeof value !== "string") return;
    el.textContent = value;
  }

  function setList(id, items) {
    var target = document.getElementById(id);
    if (!target) return;
    target.innerHTML = "";
    (items || []).forEach(function (item) {
      var li = document.createElement("li");
      li.textContent = item;
      target.appendChild(li);
    });
  }

  function appendNamePills(target, names) {
    var list = document.createElement("div");
    list.className = "name-list";
    (names || []).forEach(function (name) {
      var chip = document.createElement("span");
      chip.className = "name-pill";
      chip.textContent = name;
      list.appendChild(chip);
    });
    target.appendChild(list);
  }

  function initLandingPage() {
    if (!data.landing) return;
    setText("landingSummary", data.landing.summary);
    setList("landingObjectives", data.landing.objectives);
    setList("withoutModelList", data.landing.withoutModel);
    setList("withModelList", data.landing.withModel);

    var principles = document.getElementById("corePrinciplesList");
    if (principles && Array.isArray(data.landing.corePrinciples)) {
      principles.innerHTML = "";
      data.landing.corePrinciples.forEach(function (principle) {
        var item = document.createElement("div");
        item.className = "principle-item";
        item.textContent = principle;
        principles.appendChild(item);
      });
    }
  }

  function initOverviewCompareToggle() {
    var toggle = document.querySelector("[data-compare-toggle]");
    var withoutPanel = document.querySelector('[data-panel="without"]');
    var withPanel = document.querySelector('[data-panel="with"]');
    if (!toggle || !withoutPanel || !withPanel) return;

    function applyMode(showWith) {
      if (showWith) {
        withoutPanel.classList.add("hidden");
        withPanel.classList.remove("hidden");
      } else {
        withoutPanel.classList.remove("hidden");
        withPanel.classList.add("hidden");
      }
    }

    toggle.addEventListener("change", function () {
      applyMode(Boolean(toggle.checked));
    });

    applyMode(false);
  }

  function initCampaignLevelsPage() {
    if (!data.campaignLevels) return;

    setText("campaignLevelsIntro", data.campaignLevels.intro);

    var levelContainer = document.getElementById("campaignLevelsContainer");
    if (levelContainer && Array.isArray(data.campaignLevels.levels)) {
      levelContainer.innerHTML = "";
      data.campaignLevels.levels.forEach(function (level) {
        var article = document.createElement("article");
        article.className = "level-card";

        var header = document.createElement("div");
        header.className = "level-header";
        var h3 = document.createElement("h3");
        h3.textContent = level.name + " - " + level.risk + " Risk";
        var badge = document.createElement("span");
        badge.className = "badge " + level.id;
        badge.textContent = level.name.toUpperCase();
        header.appendChild(h3);
        header.appendChild(badge);

        var riskTitle = document.createElement("h4");
        riskTitle.textContent = "Default Criteria";
        var riskList = document.createElement("ul");
        riskList.className = "list-clean";
        (level.criteria || []).forEach(function (item) {
          var li = document.createElement("li");
          li.textContent = item;
          riskList.appendChild(li);
        });

        var roleTitle = document.createElement("h4");
        roleTitle.textContent = "Ownership";
        var roleList = document.createElement("ul");
        roleList.className = "role-lines";

        [
          { role: "Who leads?", assignee: level.lead },
          { role: "Sign-off?", assignee: level.signOff }
        ].forEach(function (entry) {
          var li = document.createElement("li");
          var role = document.createElement("span");
          role.className = "role-name";
          role.textContent = entry.role;
          var assignee = document.createElement("span");
          assignee.className = "role-assignee";
          assignee.textContent = entry.assignee;
          li.appendChild(role);
          li.appendChild(assignee);
          roleList.appendChild(li);
        });

        article.appendChild(header);
        article.appendChild(riskTitle);
        article.appendChild(riskList);
        article.appendChild(roleTitle);
        article.appendChild(roleList);
        levelContainer.appendChild(article);
      });
    }

    var experienceTable = document.getElementById("writerExperienceBody");
    if (experienceTable && Array.isArray(data.campaignLevels.writerExperience)) {
      experienceTable.innerHTML = "";
      data.campaignLevels.writerExperience.forEach(function (row) {
        var tr = document.createElement("tr");
        var tdLevel = document.createElement("th");
        tdLevel.scope = "row";
        tdLevel.className = "matrix-rowhead";
        tdLevel.textContent = row.level;
        var tdDefinition = document.createElement("td");
        tdDefinition.textContent = row.definition;
        var tdWriters = document.createElement("td");
        appendNamePills(tdWriters, row.writers || []);
        tr.appendChild(tdLevel);
        tr.appendChild(tdDefinition);
        tr.appendChild(tdWriters);
        experienceTable.appendChild(tr);
      });
    }
  }

  function initGovernancePage() {
    if (!data.qualityGovernance) return;
    setText("qualityGovernanceIntro", data.qualityGovernance.intro);
    setList("ownershipList", data.qualityGovernance.ownership);
    setList("processQAList", data.qualityGovernance.processQA);
  }

  function initStructuredSupportPage() {
    if (!data.structuredSupport) return;
    setText("structuredSupportIntro", data.structuredSupport.intro);
    setText("structuredSupportDefinition", data.structuredSupport.definition);
    setList("structuredCriteriaList", data.structuredSupport.criteria);
    setList("recurringIssuesList", data.structuredSupport.recurringIssues);

    var ladderShell = document.getElementById("ladderSteps");
    if (!ladderShell || !Array.isArray(data.structuredSupport.ladder)) return;

    ladderShell.innerHTML = "";
    data.structuredSupport.ladder.forEach(function (step) {
      var line = document.createElement("article");
      line.className = "ladder-line";

      var h3 = document.createElement("h3");
      h3.textContent = step.label;

      var when = document.createElement("p");
      when.innerHTML = "<strong>When:</strong> " + (step.when || "");

      var title = document.createElement("h4");
      title.textContent = "Actions";

      var actionList = document.createElement("ul");
      actionList.className = "list-clean";
      (step.actions || []).forEach(function (action) {
        var li = document.createElement("li");
        li.textContent = action;
        actionList.appendChild(li);
      });

      line.appendChild(h3);
      line.appendChild(when);
      line.appendChild(title);
      line.appendChild(actionList);
      ladderShell.appendChild(line);
    });
  }

  function initPlanningCallsPage() {
    if (!data.planningCalls) return;

    setText("planningCallsIntro", data.planningCalls.intro);
    setList("planningPrepList", data.planningCalls.prep);
    setList("planningRhythmList", data.planningCalls.weeklyRhythm);
    setText("planningVisibilityNote", data.planningCalls.visibilityNote);
  }

  document.addEventListener("DOMContentLoaded", function () {
    initLandingPage();
    initOverviewCompareToggle();
    initCampaignLevelsPage();
    initGovernancePage();
    initStructuredSupportPage();
    initPlanningCallsPage();
  });
})();
