import RouteController from "./routes/routeController";
import { Toaster } from "sonner";

export default function App() {
  return (
    <>
      <RouteController />
      <Toaster position="bottom-center" mobileOffset={80} richColors closeButton />
    </>
  );
}
