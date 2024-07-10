import Link from "next/link";
import { FlipWords } from "../components/flip-words";
import { AnimatedShinyTextDemo } from "../components/butonAlgo";

export default async function Index() {
  const words = ["beautiful", "useful", "engaging", "efficient"];

  return (
    <>
      <main className="flex-1 flex flex-col gap-6">
        <div className="h-[40rem] flex flex-col justify-around items-center px-4 ">
          <div className="text-4xl mx-auto font-normal text-neutral-600 dark:text-neutral-400  ">
            Create
            <FlipWords words={words} /> <br />
            innovative user experiences
          </div>

          <Link href={"/ai"}>
            <AnimatedShinyTextDemo />
          </Link>
        </div>
        <div className="h-36 bg-background"></div>
      </main>
    </>
  );
}
