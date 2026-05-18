import SetlistForm from "@/components/SetlistForm";

  export const metadata = {
    title : "Add New Setlist - Worship Flow"
}

export default function NewSetlistPage() {
  return (
    <div className="w-full p-6">
      <h1 className="text-3xl font-bold mb-6">
        New Setlist
      </h1>

      <SetlistForm />
    </div>
  );
}