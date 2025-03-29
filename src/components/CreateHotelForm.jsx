import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import { useCreateHotelMutation } from "@/lib/api";

const initialAmenities = [
    "Free WiFi",
    "Swimming Pool",
    "Gym",
    "Parking",
    "Spa",
    "Breakfast Included",
    "Air Conditioning",
    "Pet Friendly",
];

const formSchema = z.object({
    name: z.string().min(1, { message: "Hotel name is required" }),
    location: z.string().min(1),
    image: z.string().min(1),
    price: z.number().positive(),
    description: z.string().min(1),
    amenities: z.array(z.string()).optional(),
});

const CreateHotelForm = () => {
    const [createHotel, { isLoading }] = useCreateHotelMutation();
    const [amenitiesList, setAmenitiesList] = useState(initialAmenities);
    const [customAmenity, setCustomAmenity] = useState("");

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            amenities: [],
        },
    });

    // const handleSubmit = async (values) => {
    //     const { name, location, image, price, description, amenities } = values;
    //     const toastId = toast.loading("Creating hotel...");
    //     try {
    //         await createHotel({
    //             name,
    //             location,
    //             image,
    //             price,
    //             description,
    //             amenities,
    //         }).unwrap();
    //         toast.success("Hotel created successfully");
    //         refetch();
    //     } catch (error) {
    //         toast.error("Hotel creation failed");
    //     } finally {
    //         toast.dismiss(toastId);
    //     }
    // };

    const handleSubmit = async (values) => {
        const { name, location, image, price, description, amenities } = values;
        const toastId = toast.loading("Creating hotel...");
        try {
            const response = await createHotel({
                name,
                location,
                image,
                price,
                description,
                amenities,
            });

            if (response.error) {
                throw new Error(
                    response.error.data?.message || "Something went wrong"
                );
            }

            toast.success("Hotel created successfully");
            form.reset();
        } catch (error) {
            console.error("Error creating hotel:", error);
            toast.error(error.message || "Hotel creation failed");
        } finally {
            toast.dismiss(toastId);
        }
    };

    const addCustomAmenity = () => {
        if (customAmenity.trim() && !amenitiesList.includes(customAmenity)) {
            setAmenitiesList([...amenitiesList, customAmenity]);
            setCustomAmenity("");
        }
    };

    return (
        <Form {...form}>
            <form className="w-1/2" onSubmit={form.handleSubmit(handleSubmit)}>
                <div className="grid gap-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Hotel Name</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Hotel Name"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Location</FormLabel>
                                <FormControl>
                                    <Input placeholder="Location" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Image</FormLabel>
                                <FormControl>
                                    <Input placeholder="Image" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Price</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder="Price"
                                        onChange={(e) =>
                                            field.onChange(
                                                parseFloat(e.target.value)
                                            )
                                        }
                                        value={field.value}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Description"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Amenities Selection */}
                    <FormField
                        control={form.control}
                        name="amenities"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Amenities</FormLabel>
                                <div className="grid grid-cols-2 gap-2">
                                    {amenitiesList.map((amenity) => (
                                        <FormItem
                                            key={amenity}
                                            className="flex items-center space-x-2"
                                        >
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value?.includes(
                                                        amenity
                                                    )}
                                                    onCheckedChange={(
                                                        checked
                                                    ) => {
                                                        field.onChange(
                                                            checked
                                                                ? [
                                                                      ...field.value,
                                                                      amenity,
                                                                  ]
                                                                : field.value.filter(
                                                                      (a) =>
                                                                          a !==
                                                                          amenity
                                                                  )
                                                        );
                                                    }}
                                                />
                                            </FormControl>
                                            <FormLabel className="text-sm font-normal">
                                                {amenity}
                                            </FormLabel>
                                        </FormItem>
                                    ))}
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Custom Amenity Input */}
                    <div className="flex items-center gap-2 mt-4">
                        <Input
                            placeholder="Add Custom Amenity"
                            value={customAmenity}
                            onChange={(e) => setCustomAmenity(e.target.value)}
                        />
                        <Button
                            type="button"
                            onClick={addCustomAmenity}
                            className="ml-2"
                        >
                            Add
                        </Button>
                    </div>
                </div>

                <div className="mt-4">
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? "Creating..." : "Create Hotel"}
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default CreateHotelForm;
