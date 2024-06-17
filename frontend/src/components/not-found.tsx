import { useNavigate } from "react-router-dom";
import Layout from "./layout";
import { Button } from "./ui/button";

export default function NotFound({
  resource_name = "resources",
}: {
  resource_name?: string;
}) {
  const navigate = useNavigate();

  return (
    <Layout>
      <h1>We Could Not find the {resource_name} you were looking for</h1>

      <Button
        onClick={() => {
          navigate(-1);
        }}
      >
        Go back
      </Button>
    </Layout>
  );
}