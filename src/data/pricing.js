export const commissionPage = {
  eyebrow: "COMMISSION INFO",
  title: "Commission Info",
  intro:
    "I specialize in anime and manga-style art, including custom character illustrations and fan art. Check the pricing below, then reach out with any questions or to get started.",
  statusOpen: "Commissions open",
  statusClosed: "Commissions closed",
  contactSectionTitle: "Contact",
  contactLabel: "Contact to commission",
  contactNote: "Best reached through Twitter or email.",
  priceSectionTitle: "Pricing",
  priceSectionIntro:
    "Base prices for each commission type. Add-ons and commercial use may change the final total.",
  priceExampleLabel: "Example",
  priceIncludesLabel: "Includes",
  priceGoodForLabel: "Good for",
  addOnSectionTitle: "Additional fee",
  addOnNameLabel: "Add-on",
  addOnFeeLabel: "Fee",
  termsSectionTitle: "Terms of Service",
  termsSectionIntro:
    "Welcome! Please take a moment to review my Terms of Service. These guidelines keep everything smooth and clear from start to finish. If anything is unclear, feel free to ask.",
};

export const priceCards = [
  {
    id: "simple",
    title: "Simple Illustration",
    description:
      "A clean, minimal illustration that focuses on a single character or object with little to no background. Perfect for profile pictures, emotes and icons.",
    example:
      "A full-body or bust character with basic coloring and shading, and a plain or simple background.",
    goodFor: "Quick commissions, character references or social media avatars.",
    prices: [
      { option: "Black & White", price: "55 USD" },
      { option: "Full Color", price: "85 USD" },
    ],
  },
  {
    id: "complex",
    title: "Complex Illustration",
    description:
      "A highly detailed, dynamic composition with multiple characters, intricate backgrounds or elaborate poses and effects. Made for immersive, polished pieces.",
    example:
      "A fully rendered character with detailed clothing, intricate backgrounds, dynamic lighting and extra effects or props.",
    goodFor: "High-impact visuals, storytelling or promotional artwork.",
    prices: [
      { option: "Black & White", price: "85 USD" },
      { option: "Full Color", price: "120 USD" },
    ],
  },
  {
    id: "character-sheet",
    title: "Character Sheet",
    description:
      "A comprehensive reference sheet showing your character from multiple angles, with key details like expressions, outfits and accessories.",
    includes:
      "Front and back views, detailed close-ups of expressions, accessories, and optional additional poses or outfits.",
    goodFor: "Character development, animation references or game assets.",
    prices: [
      { option: "Black & White", price: "Contact for quote" },
      { option: "Full Color", price: "Contact for quote" },
    ],
  },
];

export const addOns = [
  {
    name: "+1 Character",
    description: "Adding each additional character to the same canvas",
    fee: "+75%",
  },
  {
    name: "Commercial Use",
    description: "If the artwork is used for business matters",
    fee: "+100% (minimum)",
  },
  {
    name: "Original File",
    description: "Client receives the original artwork file (PSD / Clip)",
    fee: "+50%",
  },
];

export const addOnNote = "Further discussion is required for commercial use.";

export const termsSections = [
  {
    id: "works-interest",
    title: "Works interest",
    intro: "What I'm happy to draw, and what I'll pass on.",
    drawTitle: "I draw",
    dontDrawTitle: "I don't draw",
    draw: [
      "Fictional characters",
      "Non-fictional characters (real people)",
      "Dynamic and interacting poses",
      "R15 content",
    ],
    dontDraw: [
      "R18+ content",
      "Heavy gore",
      "Specific kinks and fetishes",
    ],
    note: "I may decline a request if I'm uncomfortable with it or if it isn't a good fit for my style or abilities.",
  },
  {
    id: "work-process",
    title: "Work process",
    intro:
      "Commissions are handled on a queue basis. Here is what to expect from references to final delivery.",
    groups: [
      {
        title: "Queue and references",
        items: [
          "Commissions are handled on a queue basis. I'll tell you your place in line after payment is made.",
          "Please provide clear visual references, such as photos or character sheets.",
          "Detailed descriptions of poses and expressions are needed. Hand-drawn descriptions, like stick figures, are also helpful.",
        ],
      },
      {
        title: "Timing",
        items: [
          "Commission work typically takes 3–14 working days, depending on complexity, communication speed and any real-life issues.",
          "I'm most active on Twitter and check my email frequently, so those are the best ways to communicate.",
        ],
      },
      {
        title: "Formatting",
        items: [
          "You can request custom sizes, resolutions and orientations.",
          "The maximum size is 5000 px at 300 dpi. Exceptions apply for commercial work.",
          "If you have no preference, I'll adapt the size, resolution and orientation to my liking.",
        ],
      },
      {
        title: "Pricing and payment methods",
        items: [
          "Displayed prices are base prices only. Add-ons may change the total.",
          "Full payment is required after the sketch is completed.",
          "Alternatively, you can pay 30% upfront during the sketch phase and the remaining 70% upon completion.",
          "Payment is accepted through PayPal. I may need your email information for the invoice.",
        ],
      },
    ],
  },
  {
    id: "commercial-use",
    title: "Commercial Use",
    intro: "For commercial projects, additional rules apply.",
    groups: [
      {
        title: "Project pre-discussion",
        items: [
          "If you're part of a talent agency, such as a VTuber or idol agency, please contact me through your management or a representative.",
          "We can arrange a private space for project discussions.",
        ],
      },
      {
        title: "Deadline",
        items: [
          "Deadlines must be agreed on during the project discussion.",
          "A safe deadline is 30+ days. An extra charge applies for deadlines shorter than 14 days.",
        ],
      },
      {
        title: "Project commitment",
        items: [
          "A project commitment fee may apply. It is charged before the sketching phase and deducted from the final price.",
          "The fee ranges from 5–20% of the base commercial price.",
          "The fee is non-refundable if the sketch is in progress or finished. It is refundable if no progress is made within the first week or if I request it because I cannot continue.",
        ],
      },
      {
        title: "Pricing calculation",
        items: [
          "Base Commercial Price includes the base price plus the commercial use fee.",
          "The commercial fee percentage ranges from 100% to 200%, depending on the project's scope and intended use.",
          "Project Commitment Fee is 5–20% of the Base Commercial Price and is deducted from the final payment.",
        ],
        formulas: [
          "Base Commercial Price = Base Price + (Base Price × Commercial Fee Percentage)",
          "Project Commitment Fee = Base Commercial Price × Commitment Fee Percentage",
          "Total Price = Base Commercial Price + Revisions",
        ],
      },
      {
        title: "Prepayment structure",
        items: [
          "Pre-sketch: initial payment, including the project commitment fee.",
          "Post-sketch: 50% of the Base Commercial Price after sketch approval.",
          "Pre-final product delivery: remaining balance, including any revision charges.",
        ],
      },
      {
        title: "Workflow",
        items: [
          "First week: project presentation and discussion, project commitment fee if applicable, thumbnail approval, sketch and colored sketch approval, and the first half prepayment.",
          "Second and third week: render process and pre-final product delivery.",
          "Fourth week: quality check, revisions if needed, final payment and product delivery.",
        ],
      },
    ],
  },
];
