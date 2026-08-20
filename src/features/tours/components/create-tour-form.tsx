'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { ImagePicker } from '@/features/tours/components/image-picker';
import { TourFormField } from '@/features/tours/components/tour-form-field';
import { useCreateTour } from '@/features/tours/hooks/use-create-tour';
import { CreateTourSchema, CreateTourType } from '@/features/tours/validations/tour.validation';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/components/ui/form';
import { useTranslations } from '@/shared/hooks/use-translations';

export const CreateTourForm = () => {
  const { t } = useTranslations();
  const { createTour, loading, error, success } = useCreateTour();

  const form = useForm<CreateTourType>({
    resolver: zodResolver(CreateTourSchema),
    defaultValues: {
      title: { en: '', ka: '' },
      description: { en: '', ka: '' },
      itinerary: { en: '', ka: '' },
      price: 0,
      totalSeats: 0,
      images: [],
      meetingPoint: '',
    },
  });

  const onSubmit = async (data: CreateTourType) => {
    await createTour(data);
    form.reset();
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="text-2xl">{t.admin.createTourTitle}</CardTitle>
        <CardDescription>{t.admin.createTourSubtitle}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <TourFormField control={form.control} name="title.en" label={t.admin.fieldTitleEn} />
              <TourFormField control={form.control} name="title.ka" label={t.admin.fieldTitleKa} />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <TourFormField
                control={form.control}
                name="description.en"
                label={t.admin.fieldDescriptionEn}
              />
              <TourFormField
                control={form.control}
                name="description.ka"
                label={t.admin.fieldDescriptionKa}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <TourFormField
                control={form.control}
                name="itinerary.en"
                label={t.admin.fieldItineraryEn}
              />
              <TourFormField
                control={form.control}
                name="itinerary.ka"
                label={t.admin.fieldItineraryKa}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <TourFormField control={form.control} name="price" label={t.admin.fieldPrice} numeric />
              <TourFormField
                control={form.control}
                name="totalSeats"
                label={t.admin.fieldTotalSeats}
                numeric
              />
            </div>

            <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t.admin.fieldImages}</FormLabel>
                  <FormControl>
                    <ImagePicker value={field.value} onChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <TourFormField
              control={form.control}
              name="meetingPoint"
              label={t.admin.fieldMeetingPoint}
            />

            {error && <p className="text-sm font-medium text-destructive">{error}</p>}
            {success && <p className="text-sm font-medium text-primary">{t.admin.success}</p>}

            <Button type="submit" className="w-full font-semibold" disabled={loading}>
              {loading ? t.admin.submitting : t.admin.submit}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
