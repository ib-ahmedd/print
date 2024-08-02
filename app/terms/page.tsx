import TermsHeadBody from "./components/TermsHeadBody";

function Terms() {
  return (
    <main className="">
      <section className="flex-col gap-4 py-8">
        <h1 className="text-2xl md:text-4xl">Terms and conditions</h1>
        <TermsHeadBody head={"Shopping online"} />
        <TermsHeadBody head={"Accuracy of information"} />
        <TermsHeadBody head={"Terms of use"} />
        <TermsHeadBody head={"Terms of sale"} />
      </section>
    </main>
  );
}

export default Terms;
