export default function ResumeSection({
  title,
  children,
}) {
  return (
    <div className="mb-8">

      <h2 className="text-xl font-bold uppercase border-b-2 border-blue-600 pb-2 mb-4 text-gray-900">
        {title}
      </h2>

      <div className="text-gray-700 leading-7">
        {children}
      </div>

    </div>
  );
}