import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

export default function NotFoundPage() {
    const navigate = useNavigate();

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Card className="w-full max-w-md text-center p-6 shadow-lg">
                <CardContent>
                    <h1 className="text-6xl font-bold text-red-500">404</h1>
                    <p className="text-lg text-gray-600 mt-4">
                        Oops! The page you’re looking for doesn’t exist.
                    </p>
                    <Button className="mt-6" onClick={() => navigate("/")}>
                        Go Back Home
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
