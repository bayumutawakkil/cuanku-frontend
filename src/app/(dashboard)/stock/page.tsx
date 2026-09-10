import { Suspense } from "react";
import StockContent from "../../../components/StockContent";

export default function StockRoute() {
  return (
    <Suspense fallback={null}>
      <StockContent />
    </Suspense>
  );
}