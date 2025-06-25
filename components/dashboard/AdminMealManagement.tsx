"use client";

import { useState, useEffect } from "react";
import { Card, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Textarea } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { Chip } from "@heroui/chip";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/modal";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/table";
import { Pagination } from "@heroui/pagination";
import { Plus, Edit, Trash2, Search, Filter } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";

interface Meal {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "diet" | "protein" | "royal";
  image: string;
  ingredients: string[];
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

const mealSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().min(1, "Price must be greater than 0"),
  category: z.enum(["diet", "protein", "royal"]),
  ingredients: z.string().min(1, "Ingredients are required"),
  calories: z.number().min(1, "Calories must be greater than 0"),
  protein: z.number().min(0, "Protein must be 0 or greater"),
  carbs: z.number().min(0, "Carbs must be 0 or greater"),
  fat: z.number().min(0, "Fat must be 0 or greater"),
  image: z.string().url("Please enter a valid image URL"),
});

type MealFormData = z.infer<typeof mealSchema>;

export function AdminMealManagement() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<MealFormData>({
    resolver: zodResolver(mealSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      category: "diet",
      ingredients: "",
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      image: "",
    },
  });

  useEffect(() => {
    fetchMeals();
  }, []);

  const fetchMeals = async () => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const mockMeals: Meal[] = [
        {
          id: "meal_1",
          name: "Mediterranean Bowl",
          description:
            "Fresh ingredients from the Mediterranean coast, rich in healthy fats and antioxidants.",
          price: 60000,
          category: "royal",
          image:
            "https://thebigmansworld.com/wp-content/uploads/2024/01/mediterranean-bowl-recipe.jpg",
          ingredients: ["Quinoa", "Olives", "Feta", "Tomatoes", "Cucumber"],
          calories: 450,
          protein: 25,
          carbs: 35,
          fat: 18,
          isActive: true,
          createdAt: "2024-01-01",
          updatedAt: "2024-01-01",
        },
        {
          id: "meal_2",
          name: "Protein Power Pack",
          description:
            "High-protein meal perfect for post-workout recovery and muscle building.",
          price: 40000,
          category: "protein",
          image:
            "https://healthclub.methodgym.com/wp-content/uploads/2025/01/meal-prep-containers-filled-with-food-scaled.jpeg",
          ingredients: [
            "Grilled Chicken",
            "Sweet Potato",
            "Broccoli",
            "Brown Rice",
          ],
          calories: 520,
          protein: 45,
          carbs: 30,
          fat: 15,
          isActive: true,
          createdAt: "2024-01-02",
          updatedAt: "2024-01-02",
        },
        {
          id: "meal_3",
          name: "Fresh Garden Salad",
          description:
            "Crisp vegetables and leafy greens with a zesty lemon vinaigrette.",
          price: 30000,
          category: "diet",
          image:
            "https://www.tasteofhome.com/wp-content/uploads/2025/02/Favorite-Mediterranean-Salad_EXPS_TOHcom25_41556_MD_P2_02_05_1b.jpg",
          ingredients: [
            "Mixed Greens",
            "Cherry Tomatoes",
            "Cucumber",
            "Avocado",
          ],
          calories: 280,
          protein: 15,
          carbs: 25,
          fat: 8,
          isActive: true,
          createdAt: "2024-01-03",
          updatedAt: "2024-01-03",
        },
      ];

      setMeals(mockMeals);
    } catch (error) {
      console.error("Failed to fetch meals:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredMeals = meals.filter((meal) => {
    const matchesSearch =
      meal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      meal.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterCategory === "all" || meal.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const paginatedMeals = filteredMeals.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredMeals.length / itemsPerPage);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "diet":
        return "success";
      case "protein":
        return "primary";
      case "royal":
        return "warning";
      default:
        return "default";
    }
  };

  const handleCreateMeal = () => {
    setSelectedMeal(null);
    setIsEditing(false);
    reset();
    onOpen();
  };

  const handleEditMeal = (meal: Meal) => {
    setSelectedMeal(meal);
    setIsEditing(true);
    reset({
      name: meal.name,
      description: meal.description,
      price: meal.price,
      category: meal.category,
      ingredients: meal.ingredients.join(", "),
      calories: meal.calories,
      protein: meal.protein,
      carbs: meal.carbs,
      fat: meal.fat,
      image: meal.image,
    });
    onOpen();
  };

  const handleDeleteMeal = async (mealId: string) => {
    if (confirm("Are you sure you want to delete this meal?")) {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500));
        setMeals((prev) => prev.filter((meal) => meal.id !== mealId));
      } catch (error) {
        console.error("Failed to delete meal:", error);
      }
    }
  };

  const onSubmit = async (data: MealFormData) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const mealData = {
        ...data,
        ingredients: data.ingredients.split(",").map((i) => i.trim()),
        id: isEditing ? selectedMeal!.id : `meal_${Date.now()}`,
        isActive: true,
        createdAt: isEditing
          ? selectedMeal!.createdAt
          : new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      if (isEditing) {
        setMeals((prev) =>
          prev.map((meal) =>
            meal.id === selectedMeal!.id ? { ...meal, ...mealData } : meal
          )
        );
      } else {
        setMeals((prev) => [...prev, mealData as Meal]);
      }

      onClose();
      reset();
    } catch (error) {
      console.error("Failed to save meal:", error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Meal Management</h2>
        <Button
          color="primary"
          startContent={<Plus className="w-4 h-4" />}
          onPress={handleCreateMeal}
        >
          Add New Meal
        </Button>
      </div>

      {/* Filters */}
      <Card className="shadow-lg border-0">
        <CardBody className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <Input
              placeholder="Search meals..."
              startContent={<Search className="w-4 h-4 text-gray-400" />}
              value={searchTerm}
              onValueChange={setSearchTerm}
              className="flex-1"
            />
            <Select
              placeholder="Filter by category"
              startContent={<Filter className="w-4 h-4 text-gray-400" />}
              selectedKeys={filterCategory ? [filterCategory] : []}
              onSelectionChange={(keys) =>
                setFilterCategory((Array.from(keys)[0] as string) || "all")
              }
              className="w-full sm:w-48"
            >
              <SelectItem key="all">All Categories</SelectItem>
              <SelectItem key="diet">Diet Plan</SelectItem>
              <SelectItem key="protein">Protein Plan</SelectItem>
              <SelectItem key="royal">Royal Plan</SelectItem>
            </Select>
          </div>
        </CardBody>
      </Card>

      {/* Meals Table */}
      <Card className="shadow-lg border-0">
        <CardBody className="p-0">
          {loading ? (
            <div className="p-8 text-center">
              <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Loading meals...</p>
            </div>
          ) : (
            <Table aria-label="Meals table">
              <TableHeader>
                <TableColumn>MEAL</TableColumn>
                <TableColumn>CATEGORY</TableColumn>
                <TableColumn>PRICE</TableColumn>
                <TableColumn>NUTRITION</TableColumn>
                <TableColumn>STATUS</TableColumn>
                <TableColumn>ACTIONS</TableColumn>
              </TableHeader>
              <TableBody>
                {paginatedMeals.map((meal) => (
                  <TableRow key={meal.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                          <Image
                            src={meal.image || "/placeholder.svg"}
                            alt={meal.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">
                            {meal.name}
                          </p>
                          <p className="text-sm text-gray-600 truncate max-w-xs">
                            {meal.description}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Chip
                        color={getCategoryColor(meal.category) as any}
                        variant="flat"
                        size="sm"
                      >
                        {meal.category.charAt(0).toUpperCase() +
                          meal.category.slice(1)}
                      </Chip>
                    </TableCell>
                    <TableCell>
                      <span className="font-semibold text-blue-600">
                        {formatPrice(meal.price)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <p>{meal.calories} cal</p>
                        <p className="text-gray-600">
                          P:{meal.protein}g C:{meal.carbs}g F:{meal.fat}g
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Chip
                        color={meal.isActive ? "success" : "danger"}
                        variant="flat"
                        size="sm"
                      >
                        {meal.isActive ? "Active" : "Inactive"}
                      </Chip>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          isIconOnly
                          size="sm"
                          variant="light"
                          onPress={() => handleEditMeal(meal)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          isIconOnly
                          size="sm"
                          variant="light"
                          color="danger"
                          onPress={() => handleDeleteMeal(meal.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardBody>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center">
          <Pagination
            total={totalPages}
            page={currentPage}
            onChange={setCurrentPage}
            showControls
          />
        </div>
      )}

      {/* Create/Edit Meal Modal */}
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="3xl"
        scrollBehavior="inside"
      >
        <ModalContent>
          <ModalHeader>
            <h3 className="text-xl font-bold">
              {isEditing ? "Edit Meal" : "Create New Meal"}
            </h3>
          </ModalHeader>
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      label="Meal Name *"
                      placeholder="Enter meal name"
                      variant="bordered"
                      isInvalid={!!errors.name}
                      errorMessage={errors.name?.message}
                    />
                  )}
                />

                <Controller
                  name="price"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="number"
                      label="Price (IDR) *"
                      placeholder="Enter price"
                      variant="bordered"
                      value={field.value?.toString() || ""}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      isInvalid={!!errors.price}
                      errorMessage={errors.price?.message}
                    />
                  )}
                />
              </div>

              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Category *"
                    placeholder="Select category"
                    variant="bordered"
                    selectedKeys={field.value ? [field.value] : []}
                    onSelectionChange={(keys) =>
                      field.onChange(Array.from(keys)[0])
                    }
                    isInvalid={!!errors.category}
                    errorMessage={errors.category?.message}
                  >
                    <SelectItem key="diet">Diet Plan</SelectItem>
                    <SelectItem key="protein">Protein Plan</SelectItem>
                    <SelectItem key="royal">Royal Plan</SelectItem>
                  </Select>
                )}
              />

              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    label="Description *"
                    placeholder="Enter meal description"
                    variant="bordered"
                    minRows={3}
                    isInvalid={!!errors.description}
                    errorMessage={errors.description?.message}
                  />
                )}
              />

              <Controller
                name="ingredients"
                control={control}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    label="Ingredients *"
                    placeholder="Enter ingredients separated by commas"
                    variant="bordered"
                    minRows={2}
                    isInvalid={!!errors.ingredients}
                    errorMessage={errors.ingredients?.message}
                  />
                )}
              />

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Controller
                  name="calories"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="number"
                      label="Calories *"
                      placeholder="0"
                      variant="bordered"
                      value={field.value?.toString() || ""}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      isInvalid={!!errors.calories}
                      errorMessage={errors.calories?.message}
                    />
                  )}
                />

                <Controller
                  name="protein"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="number"
                      label="Protein (g)"
                      placeholder="0"
                      variant="bordered"
                      value={field.value?.toString() || ""}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      isInvalid={!!errors.protein}
                      errorMessage={errors.protein?.message}
                    />
                  )}
                />

                <Controller
                  name="carbs"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="number"
                      label="Carbs (g)"
                      placeholder="0"
                      variant="bordered"
                      value={field.value?.toString() || ""}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      isInvalid={!!errors.carbs}
                      errorMessage={errors.carbs?.message}
                    />
                  )}
                />

                <Controller
                  name="fat"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="number"
                      label="Fat (g)"
                      placeholder="0"
                      variant="bordered"
                      value={field.value?.toString() || ""}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      isInvalid={!!errors.fat}
                      errorMessage={errors.fat?.message}
                    />
                  )}
                />
              </div>

              <Controller
                name="image"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Image URL *"
                    placeholder="Enter image URL"
                    variant="bordered"
                    isInvalid={!!errors.image}
                    errorMessage={errors.image?.message}
                  />
                )}
              />
            </form>
          </ModalBody>
          <ModalFooter>
            <Button variant="bordered" onPress={onClose}>
              Cancel
            </Button>
            <Button
              color="primary"
              onPress={() => handleSubmit(onSubmit)}
              isLoading={isSubmitting}
            >
              {isEditing ? "Update Meal" : "Create Meal"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
