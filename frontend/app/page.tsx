import CustomerReviews from "../components/sections/CustomerReviews";
import Categories from "../components/sections/Categories5";

export default function Home() {
  return (
    <main
      style={{
        background: "#050505",
        minHeight: "100vh",
      }}
    > 
          <Categories />

      <CustomerReviews />
    </main>
  );
}