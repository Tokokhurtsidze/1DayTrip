'use client';

import { type Control, type FieldPath } from 'react-hook-form';

import { CreateTourType } from '@/features/tours/validations/tour.validation';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/components/ui/form';
import { Input } from '@/shared/components/ui/input';

type TourFormFieldProps = {
  control: Control<CreateTourType>;
  name: FieldPath<CreateTourType>;
  label: string;
  numeric?: boolean;
  placeholder?: string;
};

export function TourFormField({ control, name, label, numeric, placeholder }: TourFormFieldProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            {numeric ? (
              <Input
                type="number"
                placeholder={placeholder}
                value={field.value as number}
                onChange={(e) => field.onChange(e.target.valueAsNumber)}
              />
            ) : (
              <Input placeholder={placeholder} {...field} value={field.value as string} />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
