import { getAllCases } from "../lib/mdx";
import WorkSectionClient from "./WorkSectionClient";

export default async function WorkSection() {
  const cases = await getAllCases();
  return <WorkSectionClient cases={cases} />;
}
