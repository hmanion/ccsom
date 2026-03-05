window.CCSOM_DATA = {
  landing: {
    summary:
      "A framework that aligns campaign risk with writer capability while keeping escalation simple.",
    objectives: [
      "Reduce direct Rob dependency so senior support is highly targeted.",
      "Align campaign risk level with writer capability from kickoff.",
      "Make quality ownership explicit across Editorial and Production.",
      "Fix recurring patterns through structured support, not firefighting."
    ],
    withoutModel: [
      "Rob is a bottleneck",
      "Luke is an invisible safety net",
      "Editors lack ownership and responsibility",
      "Planning is inconsistent",
      "Quality is personality-dependent"
    ],
    withModel: [
      "Rob's time is protected",
      "Escalation is clear and structured",
      "Responsibilities are distributed",
      "Risk is identified early",
      "Quality develops with the team"
    ],
    corePrinciples: [
      "The model works by aligning campaign risk with writer capability, while keeping escalation simple.",
      "Quality is designed-in early, not just found out about at the end of production.",
      "Oversight is risk-based, not universal.",
      "Support and intervention escalate based on clear criteria.",
      "SME ownership sits with Editorial.",
      "QA is about detecting patterns, not policing.",
      "Rob's involvement should be strategic, not day-to-day operational.",
      "No one should be a bottleneck."
    ]
  },
  campaignLevels: {
    intro:
      "At campaign kickoff, the Production Editor and Client Services Lead agree the campaign risk level and support profile.",
    levels: [
      {
        id: "level-1",
        name: "Level 1",
        risk: "Higher",
        criteria: ["Tier 1 clients", "Complex subject matter"],
        lead: "Senior Writers",
        signOff: "No default sign-off required"
      },
      {
        id: "level-2",
        name: "Level 2",
        risk: "Moderate",
        criteria: ["New clients", "New topic area", "Technical topic"],
        lead: "Mid-level or Senior Writers",
        signOff: "Only Mid-level Writers require Senior sign-off"
      },
      {
        id: "level-3",
        name: "Level 3",
        risk: "Low",
        criteria: ["Existing client", "Familiar topic"],
        lead: "Any Writer",
        signOff: "Only Junior Writers require Senior sign-off"
      }
    ],
    writerExperience: [
      {
        level: "Junior Writers",
        definition: "Graduate or early-career writers.",
        writers: ["Fran Roche"]
      },
      {
        level: "Mid-level Writers",
        definition:
          "Experienced writers who are developing their subject matter expertise.",
        writers: ["Kristian McCann", "Christopher Carey"]
      },
      {
        level: "Senior Writers",
        definition: "Experienced writers with solid subject matter expertise.",
        writers: [
          "Nicole Willing",
          "Marcus Law",
          "Rob Wilkinson",
          "Kieran Devlin",
          "Rhys Fisher"
        ]
      }
    ]
  },
  qualityGovernance: {
    intro:
      "Quality ownership is explicit, with Senior Writers and Associate Editors owning content quality while Production monitors process adherence.",
    ownership: [
      "Content quality is owned by Senior Writers, with Associate Editors responsible for their publications.",
      "Process adherence and preparation quality is monitored by the Production Editor.",
      "If something has already had Senior Writer support or review, it does not require Production Editor QA."
    ],
    processQA: [
      "Monitoring adherence to best-practice process",
      "Reviewing a sample of planning calls",
      "Identifying recurring quality gaps",
      "Co-ordinating structured support where patterns appear",
      "Aligning campaigns with our expertise and capacity",
      "Focus is preparation quality, not stylistic micro-feedback."
    ]
  },
  structuredSupport: {
    intro:
      "Structured support is put in place when escalation criteria are met and the Production Editor confirms intervention is needed.",
    definition:
      "Structured support includes a 30-day shadowing plan where the content creator shares thinking and writing with a designated reviewer.",
    criteria: [
      "Risk to our credibility as industry SMEs",
      "Not aligned to client expectations",
      "More than two rounds of client amends",
      "Repeated errors or structural weakness",
      "Negative client feedback"
    ],
    ladder: [
      {
        label: "First line: Senior Writer (peer support)",
        when: "First support step for structured support",
        actions: [
          "Review planning call preparation",
          "Support or provide subject expertise",
          "Sign-off drafts before they go to the client",
          "Coach on structure and tone",
          "No Senior Writer should support more than 4 campaigns at a time."
        ]
      },
      {
        label: "Second line: Publisher (Rob Scott)",
        when:
          "Escalate when reputational risk is significant, expertise is missing, or client confidence requires senior involvement",
        actions: [
          "Provide targeted senior involvement for significant risk.",
          "Rob is not a routine reviewer."
        ]
      }
    ],
    recurringIssues: [
      "Issue reviewed and confirmed by Production Editor",
      "Structured 30-day support plan initiated",
      "A senior writer or internal SME is assigned as shadow",
      "Clear and measurable improvement targets",
      "Review at end of 30 days",
      "The goal is to fix patterns, not firefight incidents."
    ]
  },
  planningCalls: {
    intro:
      "Planning calls are a high client-risk moment, so preparation standards and weekly visibility are mandatory.",
    prep: [
      "Clear proposed angles",
      "Conducted subject research",
      "Aligned the plan with the campaign objective"
    ],
    weeklyRhythm: [
      "In Monday Editorial meeting, each writer shares planning calls for the week.",
      "Writers confirm they used the planning structure and stored it in the campaign folder.",
      "Writers flag any support needed for subject matter expertise.",
      "Peer visibility reduces the amount of policing needed."
    ],
    visibilityNote:
      "This peer visibility is to reduce the amount of policing needed."
  }
};
