import { useEffect, useState } from "react";
import { IUserAnswer } from "./QuizContainer";
import Confetti from "react-confetti";
import axios from "axios";
import { motion } from "framer-motion";
import { TailSpin } from "react-loader-spinner";

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

const ResultDisplay: React.FC<IResultDisplayProps> = ({ userAnswers }) => {
  const [heroProfiles, setHeroProfiles] = useState<IHeroProfile[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [loading, setLoading] = useState(true);

  console.log(import.meta.env.VITE_API_TOKEN);

  useEffect(() => {
    const fetchHeroProfiles = async () => {
      const heroProfilePromises = userAnswers.map(async ({ name }) => {
        const {
          data: { results },
        } = await axios.get<SuperHeroAPIResponse>(
          `https://superheroapi.com/api.php/${
            import.meta.env.VITE_API_TOKEN
          }/search/${name}`
        );
        return results[results.length - 1];
      });
      const heroProfileResults = await Promise.all(heroProfilePromises);
      setHeroProfiles(heroProfileResults);
      setShowConfetti(true);
      setLoading(false);
    };

    fetchHeroProfiles();
  }, [userAnswers]);

  return (
    <>
      {showConfetti && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <TailSpin color="red" />
        </div>
      ) : (
        heroProfiles.map((superhero) => (
          <motion.div
            key={superhero.id}
            className="container mx-auto px-4 py-8"
            initial={{ scale: 0.7 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-4xl">
              <div className="md:flex">
                <div className="md:flex-shrink-0">
                  <img
                    className="h-64 w-full object-cover md:w-64"
                    src={superhero.image.url}
                    alt={superhero.name}
                  />
                </div>
                <div className="p-8 flex flex-col justify-between">
                  <div>
                    <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                      {superhero.biography.publisher}
                    </div>
                    <h2 className="block mt-1 text-2xl leading-tight font-semibold text-gray-900">
                      {superhero.name}
                    </h2>
                    <div className="mt-4 text-gray-600">
                      <div className="mb-2">
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">
                          Biography
                        </h3>
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
                          <span className="font-semibold">Alignment:</span>{" "}
                          {superhero.biography.alignment}
                        </p>
                      </div>
                      <div className="mb-2">
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">
                          Appearance
                        </h3>
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
                      <div className="mb-2">
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">
                          Work
                        </h3>
                        <p>
                          <span className="font-semibold">Occupation:</span>{" "}
                          {superhero.work.occupation}
                        </p>
                        <p>
                          <span className="font-semibold">Base:</span>{" "}
                          {superhero.work.base}
                        </p>
                      </div>
                      <div className="mb-2">
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">
                          Connections
                        </h3>
                        <p>
                          <span className="font-semibold">
                            Group Affiliation:
                          </span>{" "}
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
              </div>
            </div>
          </motion.div>
        ))
      )}
    </>
  );
};

export default ResultDisplay;
