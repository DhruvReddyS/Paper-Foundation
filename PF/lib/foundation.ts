// Central source of truth for the registered foundation's real details.

export const foundation = {
  legalName: "Paper Foundation",
  shortName: "Paper Foundation",
  tagline: "Love Paper, use Paper without Hesitation.",
  editorialLine:
    "An evidence-based public initiative on paper, printing, recycling and the natural systems that paper depends on.",
  registration: {
    number: "50 of 2025",
    certNo: "TSGGDI 50843722",
    registeredOn: "28 February 2025",
    act: "Telangana Societies Registration Act, 2001",
    authority: "Government of Telangana, Registrar of Societies, Hyderabad",
  },
  address: {
    line1: "1-2-234/11, Domalguda",
    line2: "Ashok Nagar, Himayatnagar",
    city: "Hyderabad",
    state: "Telangana",
    country: "India",
  },
  contactEmail: "contact@paperfoundation.in",
  partners: [
    {
      name: "Forum of Print Lovers",
      url: "https://www.printlovers.in/",
      note: "Public-awareness campaigns: Think Planet · Think Print",
    },
    { name: "Power of Print", url: "https://www.printlovers.in/" },
  ],
  advisors: [
    {
      name: "Narender Paruchuri",
      role: "Founder, Pragathi Art Printers",
      bio: "Veteran of the Indian print industry; long-time champion of responsible paper use.",
    },
    {
      name: "Anka Rao",
      role: "Environmentalist · Advisor, Government of Andhra Pradesh (Environment)",
      bio: "Public policy and environmental advisory experience at state level.",
    },
    {
      name: "Sanjay Singh",
      role: "Managing Director, ITC (Paperboards & Specialty Papers)",
      bio: "Industry leadership in sustainable paperboard and pulp manufacturing.",
    },
    {
      name: "Venkateshwar Rao",
      role: "Editor, Raithu Naisthan Magazine",
      bio: "Agricultural journalism and rural readership advocacy.",
    },
  ],
};

export type Advisor = (typeof foundation.advisors)[number];
