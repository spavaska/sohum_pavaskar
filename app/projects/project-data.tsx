export interface Project {
  title: string;
  year: number;
  description: string;
  url: string;
}

export const projects: Project[] = [
  {
    title: "News NLP Scrapper 🗞️",
    year: 2024,
    description:
      "Fetches trending news articles from trusted sources. Users can search news regarding certain topics, countries, or keyword searches",
    url: "https://github.com/spavaska/News-NLP-Scrapper",
  },
  {
    title: "LinkedIn Scrapper for Alumni Database 🔗",
    year: 2023,
    description:
      "Parses LinkedIn profiles. Uses BeautifulSoup with HTML tags to extract key data points (company, current role, university, year graduated, etc.).",
    url: "",
  },
];
