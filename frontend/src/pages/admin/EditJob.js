import PlaceholderPage from "../../components/Common/PlaceholderPage";

export default function EditJob() {
  return (
    <PlaceholderPage
      title="Edit Job"
      description="Update the details of an existing job opening."
      fields={["Job Title", "Company", "Location"]}
    />
  );
}
