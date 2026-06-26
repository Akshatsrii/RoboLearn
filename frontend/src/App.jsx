import Layout from "./components/layout/Layout";
import AppRoutes from "./routes/AppRoutes";
import ChatWidget from "./components/ui/ChatWidget";

function App() {
  return (
    <Layout>
      <AppRoutes />
            <ChatWidget />

    </Layout>
  );
}

export default App;
