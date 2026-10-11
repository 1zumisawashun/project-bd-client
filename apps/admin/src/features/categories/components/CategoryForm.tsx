import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Button, Field, FieldLabel, TextInput } from "@project-bd-client/ui";
import { createCategory } from "../categories.api";
import { categoryFormSchema, type CategoryFormValues } from "../categoryForm.schema";

type CategoryFormProps = {
  onSuccess?: () => void;
};

export function CategoryForm({ onSuccess }: CategoryFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: "",
    },
  });

  const mutation = useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      reset();
      onSuccess?.();
    },
  });

  const onSubmit = (data: CategoryFormValues) => {
    mutation.mutate(data);
  };

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form onSubmit={handleSubmit(onSubmit)}>
      <Field>
        <FieldLabel>カテゴリー名</FieldLabel>
        <TextInput {...register("name")} placeholder="カテゴリー名を入力" />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
      </Field>

      {mutation.isError && (
        <p className="text-red-500 text-sm mt-2">{mutation.error.message}</p>
      )}

      <div className="mt-4">
        <Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "作成中..." : "作成"}
        </Button>
      </div>
    </form>
  );
}
