import { Button } from "./components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import { Input } from "./components/ui/input";

export default function Home() {
  localStorage.setItem("APIKEYREGISTERED", "no");
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Set your API key!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input placeholder="Gemini API key.." id="key" />
          <Button
            className="w-full"
            onClick={() => {
              localStorage.clear();
              localStorage.setItem("APIKEYREGISTERED", "yes");
              localStorage.setItem(
                "APIKEY",
                // @ts-expect-error
                document.getElementById("key").value
              );

              window.location.href = "/app";
            }}
          >
            Confirm
          </Button>
          <CardDescription>
            Welcome to the chatbot, powered by Google's Gemini AI model. This
            chatbot was made with "intelligent"; a library for simplifying the
            integration of AI models.{" "}
            <a href="https://npmjs.com/package/intelligent">
              <b>https://npmjs.com/package/intelligent</b>
            </a>
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  );
}
