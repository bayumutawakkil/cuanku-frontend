import { Suspense } from "react";
import TransactionContent from "../../../components/TransactionContent";

export default function TransactionsRoute() {
  return (
    <Suspense fallback={null}>
      <TransactionContent />
    </Suspense>
  );
}