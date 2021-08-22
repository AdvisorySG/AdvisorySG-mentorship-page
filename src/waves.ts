import { Mentor, RawData } from "./interfaces";

export const fetchWaves = async (
  setWaves: (
    waves: {
      [key: string]: Mentor;
    }[]
  ) => void,
  setActiveWaveIndex: (index: number) => void
) => {
  const wavesData: RawData[][] = await fetch(
    "https://d21fj0gildolug.cloudfront.net/load_mentors"
  )
    .then((response) => response.json())
    .then(({ waves }) => waves);

  const formatMentor = (mentor: RawData): Mentor => ({
    courseOfStudy: mentor["Course of Study"],
    fullBio: mentor.Biography,
    fullImageUrl:
      Array.isArray(mentor.Photo) && mentor.Photo.length > 0
        ? mentor.Photo[0].url
        : "/mentor-thumbnail.png",
    industries: [
      mentor["Industry 1"],
      mentor["Industry 2"],
      mentor["Industry 3"],
    ]
      .filter(Boolean)
      .flat(),
    name: mentor.Name,
    organisation: mentor.Organisation,
    role: mentor["Job Title"],
    school: mentor.School,
    thumbnailImageUrl:
      Array.isArray(mentor.Photo) &&
      mentor.Photo.length > 0 &&
      mentor.Photo[0].thumbnails
        ? mentor.Photo[0].thumbnails.large.url
        : "/mentor-thumbnail.png",
  });

  const waves: { [key: string]: Mentor }[] = [];

  wavesData.forEach((wave) => {
    const newObj: { [key: string]: Mentor } = {};

    wave.forEach((mentor) => {
      newObj[mentor.id] = formatMentor(mentor);
    });

    waves.push(newObj);
  });

  setWaves(waves);
  setActiveWaveIndex(waves.length - 1);
};
