import CustomerReviews from "../components/sections/CustomerReviews";

export default function Home() {
  return (
    <main
      style={{
        paddingTop: "90px",
        background: "#050505",
        minHeight: "100vh",
      }}
    >
      <CustomerReviews />
    </main>
  );
}