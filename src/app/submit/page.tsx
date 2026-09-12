import SubmissionForm from "@/components/submit/SubmissionForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Submit | Kurdish Digital Archive",
  description: "Help preserve Kurdish culture by submitting poems, quotes, and historical corrections.",
};

export default function SubmitPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 md:px-8 py-12 md:py-20 w-full flex-1">
      
      {/* Header */}
      <div className="mb-12 text-center md:text-left">
        <h1 className="font-serif text-4xl md:text-5xl text-zinc-100 mb-6">Help preserve Kurdish culture.</h1>
        <p className="text-zinc-400 text-lg leading-relaxed max-w-2xl">
          The archive relies on the community to discover, verify, and translate our history.
          Every submission is carefully reviewed by moderators before it is published to ensure historical accuracy.
        </p>
      </div>

      <SubmissionForm />

    </main>
  );
}
