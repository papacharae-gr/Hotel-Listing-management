import { useEffect } from "react";
import { Button, Flex, Heading, HStack, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextInput, FormCheckbox } from "../../../../components";
import { listingUpdateSchema, type ListingUpdateFormValues } from "./validationSchema";

const ALL_AMENITIES = ["WiFi", "Parking", "Pool", "Gym", "Restaurant"];

type Props = {
  defaultValues: ListingUpdateFormValues; // from fetched data
  onSubmit: (values: ListingUpdateFormValues) => Promise<void> | void;
  isSubmitting?: boolean;
};

export default function ListingUpdateForm({ defaultValues, onSubmit, isSubmitting }: Props) {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
    setValue,
  } = useForm<ListingUpdateFormValues>({
    resolver: zodResolver(listingUpdateSchema),
    defaultValues,
  });

  // όταν αλλάζει το fetched data, κάνε reset
  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const selected = watch("amenities");

  const toggleAmenity = (name: string) => {
    const set = new Set(selected);
    if (set.has(name)) set.delete(name);
    else set.add(name);
    setValue("amenities", Array.from(set), { shouldValidate: true });
  };

  return (
    <Stack as="form" onSubmit={handleSubmit(onSubmit)} gap={6}>
      <Heading size="lg">Edit Listing</Heading>

      <TextInput
        label="Name"
        name="name"
        register={register("name")}
        error={errors.name}
      />

      <TextInput
        label="Description"
        name="description"
        textarea
        register={register("description")}
        error={errors.description}
      />

      <Stack>
        <Heading size="sm">Amenities</Heading>
        <Controller
          name="amenities"
          control={control}
          render={() => (
            <SimpleGrid columns={[2, 3]} gap={3}>
              {ALL_AMENITIES.map((a) => (
                <FormCheckbox
                  key={a}
                  value={a}
                  isChecked={selected?.includes(a) ?? false}
                  onChange={() => toggleAmenity(a)}
                >
                  {a}
                </FormCheckbox>
              ))}
            </SimpleGrid>
          )}
        />
        {errors.amenities && (
          <Text color="red.500" fontSize="sm">
            {errors.amenities.message as string}
          </Text>
        )}
      </Stack>

      <Flex justify="flex-end">
        <HStack>
          <Button variant="ghost" onClick={() => reset()}>
            Reset
          </Button>
          <Button colorScheme="blue" type="submit" isLoading={isSubmitting} isDisabled={isSubmitting}>
            Save
          </Button>
        </HStack>
      </Flex>
    </Stack>
  );
}
