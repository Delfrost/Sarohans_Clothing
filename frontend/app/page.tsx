import CustomerReviews from "../components/sections/CustomerReviews";

export default function Home() {
  return (
    <main
      style={{
        background: "#050505",
        minHeight: "100vh",
      }}
    >
      <CustomerReviews />
    </main>
  );
}