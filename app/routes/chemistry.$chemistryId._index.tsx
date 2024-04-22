import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = ({ matches }) => {
  const parentMeta = matches[0].meta
    .filter((meta) => !("title" in meta) && !("og:description" in meta) );
  console.log(parentMeta)
  return [
    ...parentMeta, 
    { title: "친구와 떠나는 여행을 준비해보세요 | 여행 타입 테스트" },
  ];
};

export { default } from "~/src/content/chemistry/ChemistryContent"