window.CCSOM_DATA = {
  context: [
    "Rob Scott stepped in to front and support the majority of campaigns during a transition phase in the second half of 2025. Now we have more journalists and more industry expertise available, we want to reduce Rob's direct involvement so he can focus his time where it is most needed in the business.",
    "This is also an opportunity to empower senior journalists and build a robust system that develops individuals and teams together."
  ],
  corePrinciples: [
    "Quality is designed in early, not just found at the end of production.",
    "Oversight is risk based, not universal.",
    "Support and intervention escalates based on clear criteria.",
    "SME ownership sits with Editorial.",
    "QA is about detecting patterns, not policing.",
    "Rob's involvement should be strategic, not day to day operational.",
    "No one should be a bottleneck."
  ],
  supportLevels: [
    {
      id: "level-1",
      name: "Level 1 - High Risk",
      defaultCriteria: [
        "Tier 1 flagship accounts (like Microsoft)",
        "Complex subject matter"
      ],
      roles: [
        { role: "CC", assignee: "Any Senior Writer or Internal SME" },
        { role: "Sign-off", assignee: "Associate Editor or Internal SME" },
        { role: "Draft stage", assignee: "Planning call prep + first drafts" },
        { role: "Support", assignee: "Internal SME or Rob Scott" }
      ],
      qaModel: "Planning call prep shared more than 72 hours before planning call (with sign-off reviewer)."
    },
    {
      id: "level-2",
      name: "Level 2 - Moderate Risk",
      defaultCriteria: [
        "New campaign topic for us",
        "New client",
        "Campaign topic is technical"
      ],
      roles: [
        { role: "CC", assignee: "Any mid-level or senior writer" },
        { role: "Sign-off", assignee: "Associate Editor" },
        { role: "Draft stage", assignee: "First drafts" },
        { role: "Support", assignee: "Optional internal SME, consulted when needed" }
      ],
      qaModel: "Sampling post-planning call."
    },
    {
      id: "level-3",
      name: "Level 3 - Low Risk",
      defaultCriteria: [
        "Existing client",
        "Campaign topic is straightforward",
        "Well matched to our writers' knowledge"
      ],
      roles: [
        { role: "CC", assignee: "Any writer" },
        { role: "Sign-off", assignee: "Not required" },
        { role: "Support", assignee: "Optional Associate Editor or Internal SME when needed" }
      ],
      qaModel: "Retrospective QA only."
    }
  ],
  roles: [
    {
      id: "content-creator",
      title: "Content Creator",
      summary: "Responsible for planning call preparation and early escalation.",
      responsibilities: [
        "Planning call preparation using best-practice template",
        "Demonstrating subject knowledge",
        "Aligning ideas to client goals",
        "Proactively seeking SME support when needed"
      ],
      rules: ["Escalate uncertainty early, not just after feedback."]
    },
    {
      id: "associate-editor",
      title: "1st Line - Associate Editor",
      summary: "Primary quality gate and editorial standards owner.",
      responsibilities: [
        "Subject expertise validation",
        "Article draft sign-off",
        "Reviewing planning call preparation",
        "Coaching writers on structure and tone",
        "Escalating when needed"
      ],
      rules: ["Associate Editors own editorial standards for their publication."]
    },
    {
      id: "internal-sme",
      title: "2nd Line - Internal SME",
      summary: "Secondary support when deeper technical authority is required.",
      responsibilities: [
        "Strengthening concept direction",
        "Validating framing and positioning",
        "Supporting credibility in planning calls"
      ],
      rules: [
        "Used when topic requires deeper technical authority.",
        "Used when writer or editor is not confident about subject matter."
      ]
    },
    {
      id: "production-editor",
      title: "Production Editor (Process and QA Layer)",
      summary: "Coordinates quality process and recurring issue intervention.",
      responsibilities: [
        "Monitoring adherence to best-practice process",
        "Reviewing planning call recordings (risk based)",
        "Identifying recurring quality gaps",
        "Triggering structured support where patterns appear",
        "Coordinating 1-month intervention plans"
      ],
      rules: ["No senior or SME should support more than 3 escalations at a time."]
    },
    {
      id: "publisher",
      title: "Publisher (Rob Scott)",
      summary: "Strategic involvement for high-risk and major client confidence concerns.",
      responsibilities: [
        "Kick-off calls (mandatory invite as optional attendee, not scheduled around)",
        "Level 1 high-risk campaigns",
        "Escalations from 2nd line",
        "Major client confidence risks"
      ],
      rules: [
        "Does not review routine drafts.",
        "Does not monitor all planning calls.",
        "Does not sit in recurring planning meetings by default."
      ]
    }
  ],
  governance: {
    prep: [
      "Clear proposed angles",
      "Conducted subject research",
      "Aligned the plan with the campaign objective"
    ],
    weeklyRhythm: [
      "In Monday Editorial meeting, each writer shares planning calls for the week.",
      "Writers confirm they used the planning structure and stored it in the campaign folder.",
      "Writers flag SME support they might need.",
      "Peer visibility reduces policing overhead."
    ],
    qaCoverage: [
      "Level 1 plus juniors: 100% reviewed within 3 days.",
      "Level 2 plus mid-level: 50% reviewed within 3 days.",
      "Level 3 plus senior/SME: sample-based monthly.",
      "Focus is preparation quality, not stylistic micro-feedback."
    ],
    draftingBySeniority: [
      {
        level: "Junior/Graduate Writers",
        model: "Mandatory sign-off on research and article drafts; regular internal-SME consultation as needed."
      },
      {
        level: "Mid-level Writers",
        model: "Associate Editor oversight (not mandatory pre-publish if trusted); retrospective QA sampling."
      },
      {
        level: "Senior Writers",
        model: "Associate Editor oversight (not mandatory pre-publish if trusted); retrospective QA sampling."
      }
    ]
  },
  escalation: {
    definition:
      "Escalation is a 30-day shadowing plan where the Content Creator shares thinking and writing with a designated reviewer. The Production Editor confirms whether a 30-day plan is needed and assigns the right level of support. This should not bypass the escalation ladder.",
    criteria: [
      "Risk to our credibility as industry SMEs",
      "Not aligned to client expectations",
      "More than two rounds of client amends",
      "Repeated errors or structural weakness",
      "Negative client feedback"
    ],
    ladder: [
      {
        id: "line-1",
        label: "1st Line - Associate Editor",
        when: "Default first escalation step",
        action: "Validate issues, coach structure/tone, and set immediate correction plan."
      },
      {
        id: "line-2",
        label: "2nd Line - Internal SME",
        when: "Escalate when subject authority or confidence is still weak",
        action: "Strengthen framing and credibility, support planning call readiness."
      },
      {
        id: "line-3",
        label: "3rd Line - Publisher (Rob)",
        when: "Escalate major confidence risk or unresolved high-risk issue",
        action: "Strategic intervention on high-risk account or significant client risk."
      }
    ],
    recurringIssues: [
      "Issue reviewed and confirmed by Production Editor",
      "Structured 30-day support plan initiated",
      "Senior writer or internal SME assigned as shadow",
      "Clear measurable improvement targets",
      "Review at end of 30 days"
    ]
  },
  targetState: {
    withoutModel: [
      "Rob is a bottleneck",
      "Luke is an invisible safety net",
      "Editors lack ownership and responsibility",
      "Planning is inconsistent",
      "Quality is personality dependent"
    ],
    withModel: [
      "Rob's time is protected",
      "Escalation is clear and structured",
      "Responsibilities are distributed",
      "Risk is identified early",
      "Quality develops with the team"
    ],
    midQ2: [
      "Clear expectations around level of support from campaign start",
      "Planning calls are prepared for",
      "Associate Editors confidently support quality",
      "Senior SMEs are used strategically",
      "Rob involved only in Tier 1 or true escalation",
      "Fewer client surprises",
      "Less firefighting",
      "Higher confidence in campaign execution"
    ]
  },
  peopleMatrix: {
    writers: {
      junior: ["Fran Roche"],
      midLevel: ["Kristian McCann", "Christopher Carey"],
      senior: ["Marcus Law"]
    },
    internalSME: {
      junior: [],
      midLevel: ["Nicole Willing"],
      senior: ["Rob Wilkinson", "Kieran Devlin", "Rhys Fisher"]
    }
  }
};
