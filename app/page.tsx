import AllArticles from "components/AllArticles";

export default async function Page() {
  return (
    <div className="m-4 sm:m-8">
      <div className="mx-auto max-w-5xl">
        <AllArticles />
      </div>
    </div>
  );
}
