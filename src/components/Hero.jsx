import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles } from "lucide-react";
import { useDispatch } from "react-redux";
import { submit } from "@/lib/features/searchSlice";
import { useState } from "react";

export default function Hero() {
    const dispatch = useDispatch();
    const [step, setStep] = useState(1);
    const [searchData, setSearchData] = useState({
        destination: "",
        experience: "",
        hotelType: "",
    });

    const handleNext = () => {
        if (step < 3) setStep(step + 1);
    };

    const handleBack = () => {
        if (step > 1) setStep(step - 1);
    };

    const handleChange = (e) => {
        setSearchData({
            ...searchData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const { destination, experience, hotelType } = searchData;

        const searchQuery = [destination, experience, hotelType]
            .filter((value) => value.trim() !== "")
            .join(", ");

        dispatch(submit(searchQuery));
    };

    const handleReset = () => {
        setSearchData({ destination: "", experience: "", hotelType: "" });
        setStep(1);
        dispatch(submit(""));
    };

    return (
        <div className="relative z-10 flex flex-col items-center text-white justify-center px-8 min-h-screen bg-gradient-to-b from-blue-900 to-blue-950">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-800 to-blue-950 opacity-80 -z-10"></div>
            <h1 className="text-4xl font-bold mb-8">Welcome to StayQuest</h1>
            <h1 className="text-4xl md:text-6xl font-bold mb-12 text-center text-white drop-shadow-lg">
                Your Perfect Stay Awaits!
            </h1>
            <p className="text-xl mb-12 text-center max-w-2xl text-gray-300">
                Tell us what you’re looking for, and we’ll find the best hotels
                for you. Start your search now!
            </p>

            <form
                onSubmit={handleSubmit}
                className="w-full max-w-3xl bg-black/10 backdrop-blur-md p-6 rounded-2xl flex flex-col items-center"
            >
                {step === 1 && (
                    <>
                        <label className="text-lg mb-2">
                            Where do you want to go?
                        </label>
                        <Input
                            type="text"
                            name="destination"
                            value={searchData.destination}
                            onChange={handleChange}
                            placeholder="Enter a destination (e.g., Paris, Bali)"
                            className="mb-4 w-full text-black"
                        />
                        <Button onClick={handleNext} type="button">
                            Next
                        </Button>
                    </>
                )}

                {step === 2 && (
                    <>
                        <label className="text-lg mb-2">
                            What kind of experience do you want?
                        </label>
                        <Input
                            type="text"
                            name="experience"
                            value={searchData.experience}
                            onChange={handleChange}
                            placeholder="Relaxing, Adventure, Romantic, etc."
                            className="mb-4 w-full text-black"
                        />
                        <div className="flex gap-4">
                            <Button onClick={handleBack} type="button">
                                Back
                            </Button>
                            <Button onClick={handleNext} type="button">
                                Next
                            </Button>
                        </div>
                    </>
                )}

                {step === 3 && (
                    <>
                        <label className="text-lg mb-2">
                            Preferred hotel type?
                        </label>
                        <Input
                            type="text"
                            name="hotelType"
                            value={searchData.hotelType}
                            onChange={handleChange}
                            placeholder="Luxury, Budget, Boutique, etc."
                            className="mb-4 w-full text-black"
                        />
                        <div className="flex gap-4">
                            <Button onClick={handleBack} type="button">
                                Back
                            </Button>
                            <Button
                                type="submit"
                                className=" hover:bg-sky-600 text-white font-semibold flex items-center gap-2 px-6 py-2 rounded-lg 
                                            hover:scale-105 "
                            >
                                <Sparkles className="animate-spin-slow text-yellow-300" />
                                AI Search
                            </Button>
                        </div>
                    </>
                )}
                {step > 1 && (
                    <Button
                        onClick={handleReset}
                        className="mt-6 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full transition-all duration-300 ease-in-out"
                    >
                        Reset Search
                    </Button>
                )}
            </form>
        </div>
    );
}
