import { z } from 'zod';

export const eventInformationSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  city: z.string().min(1, { message: 'Location is required' }),
  address: z.string().min(1, { message: 'Address is required' }),
  startDate: z.date({
    required_error: 'Start date is required',
    invalid_type_error: 'Start date is required',
  }),
  endDate: z.date({
    required_error: 'End date is required',
    invalid_type_error: 'End date is required',
  }),
  categories: z.array(z.object({
    id: z.string(),
    name: z.string()
  })).min(1, { message: 'At least one category must be selected' }),
  imageFile: z.instanceof(File).nullable().optional(),
});

// Схема для другого кроку
export const eventDetailsSchema = z.object({
  volunteerSlots: z.string()
    .min(1, { message: 'Number of volunteer slots is required' })
    .refine(val => !isNaN(Number(val)) && Number(val) > 0, { 
      message: 'Volunteer slots must be a positive number' 
    }),
  registrationDeadline: z.date({
    required_error: 'Registration deadline is required',
    invalid_type_error: 'Registration deadline is required',
  }),
  description: z.string().min(1, { message: 'Description is required' }),
});

export const eventFormSchema = eventInformationSchema.merge(eventDetailsSchema);

export type EventInformationSchema = z.infer<typeof eventInformationSchema>;
export type EventDetailsSchema = z.infer<typeof eventDetailsSchema>;
export type EventFormSchema = z.infer<typeof eventFormSchema>;