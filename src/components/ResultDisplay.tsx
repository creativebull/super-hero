import { useEffect, useState } from "react";
import { IUserAnswer } from "./QuizContainer";
import axios from "axios";

interface IHeroProfile {
  id: string;
  name: string;
  powerstats: {
    intelligence: string;
    strength: string;
    speed: string;
    durability: string;
    power: string;
    combat: string;
  };
  biography: {
    "full-name": string;
    "alter-egos": string;
    aliases: string[];
    "place-of-birth": string;
    "first-appearance": string;
    publisher: string;
    alignment: string;
  };
  appearance: {
    gender: string;
    race: string;
    height: string[];
    weight: string[];
    "eye-color": string;
    "hair-color": string;
  };
  work: {
    occupation: string;
    base: string;
  };
  connections: {
    "group-affiliation": string;
    relatives: string;
  };
  image: {
    url: string;
  };
}

interface SuperHeroAPIResponse {
  response: string;
  "results-for": string;
  results: IHeroProfile[];
}

interface IResultDisplayProps {
  userAnswers: IUserAnswer[];
}

const proxyUrl = "https://cors-anywhere.herokuapp.com/";

const ResultDisplay: React.FC<IResultDisplayProps> = ({ userAnswers }) => {
  const [heroProfiles, setHeroProfiles] = useState<IHeroProfile[]>([]);

  useEffect(() => {
    const fetchHeroProfiles = async () => {
      const heroProfilePromises = userAnswers.map(async ({ name }) => {
        const {
          data: { results },
        } = await axios.get<SuperHeroAPIResponse>(
          `${proxyUrl}https://superheroapi.com/api/6b50acc3f72acefd5578b622a8ce6374/search/${name}`
        );
        return results[results.length - 1];
      });
      const heroProfileResults = await Promise.all(heroProfilePromises);
      setHeroProfiles(heroProfileResults);
    };

    fetchHeroProfiles();
  }, [userAnswers]);

  return (
    <>
      {heroProfiles.map((superhero) => (
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-center items-center">
            <div className="md:w-1/3">
              <img
                src={superhero.image.url}
                alt={superhero.name}
                className="rounded-lg shadow-lg mb-4"
              />
            </div>
            <div className="md:w-2/3 md:pl-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                {superhero.name}
              </h1>
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-gray-700 mb-2">
                  Biography
                </h2>
                <p>
                  <span className="font-semibold">Full Name:</span>{" "}
                  {superhero.biography["full-name"]}
                </p>
                <p>
                  <span className="font-semibold">Alter Egos:</span>{" "}
                  {superhero.biography["alter-egos"]}
                </p>
                <p>
                  <span className="font-semibold">Aliases:</span>{" "}
                  {superhero.biography.aliases.join(", ")}
                </p>
                <p>
                  <span className="font-semibold">Place of Birth:</span>{" "}
                  {superhero.biography["place-of-birth"]}
                </p>
                <p>
                  <span className="font-semibold">Publisher:</span>{" "}
                  {superhero.biography.publisher}
                </p>
                <p>
                  <span className="font-semibold">Alignment:</span>{" "}
                  {superhero.biography.alignment}
                </p>
              </div>
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-gray-700 mb-2">
                  Appearance
                </h2>
                <p>
                  <span className="font-semibold">Gender:</span>{" "}
                  {superhero.appearance.gender}
                </p>
                <p>
                  <span className="font-semibold">Race:</span>{" "}
                  {superhero.appearance.race}
                </p>
                <p>
                  <span className="font-semibold">Height:</span>{" "}
                  {superhero.appearance.height[0]} (
                  {superhero.appearance.height[1]})
                </p>
                <p>
                  <span className="font-semibold">Weight:</span>{" "}
                  {superhero.appearance.weight[0]} (
                  {superhero.appearance.weight[1]})
                </p>
                <p>
                  <span className="font-semibold">Eye Color:</span>{" "}
                  {superhero.appearance["eye-color"]}
                </p>
                <p>
                  <span className="font-semibold">Hair Color:</span>{" "}
                  {superhero.appearance["hair-color"]}
                </p>
              </div>
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-gray-700 mb-2">
                  Work
                </h2>
                <p>
                  <span className="font-semibold">Occupation:</span>{" "}
                  {superhero.work.occupation}
                </p>
                <p>
                  <span className="font-semibold">Base:</span>{" "}
                  {superhero.work.base}
                </p>
              </div>
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-gray-700 mb-2">
                  Connections
                </h2>
                <p>
                  <span className="font-semibold">Group Affiliation:</span>{" "}
                  {superhero.connections["group-affiliation"]}
                </p>
                <p>
                  <span className="font-semibold">Relatives:</span>{" "}
                  {superhero.connections.relatives}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ResultDisplay;
