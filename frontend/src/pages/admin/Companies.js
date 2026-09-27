import PlaceholderPage from "../../components/Common/PlaceholderPage";

export default function Companies() {
  return (
    <PlaceholderPage
      title="Add Company"
      description="Register a new company for campus placements."
      fields={["Company Name", "Industry", "Location"]}
    />
  );
}
