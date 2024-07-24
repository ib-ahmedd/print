function SubmitBtn({ title, handleSubmit, loading }: SubmitBtnProps) {
  return (
    <button
      onClick={handleSubmit}
      disabled={loading}
      className={`py-3 w-full bg-site-orange text-white rounded-md ${
        loading && "opacity-40"
      }`}
    >
      {loading ? "LOADING" : title}
    </button>
  );
}

interface SubmitBtnProps {
  title: string;
  handleSubmit(): void;
  loading: boolean;
}

export default SubmitBtn;
