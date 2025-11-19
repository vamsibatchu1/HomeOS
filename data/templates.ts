import { TaskTemplate, Domain } from '@/types';

export const taskTemplates: TaskTemplate[] = [
  // HOME DOMAIN
  { id: 'home-air-filter', name: 'Change Air Filter', category: 'Air Filters', domain: 'home', defaultFrequency: { type: 'monthly', value: 3 }, icon: 'Wind' },
  { id: 'home-trash', name: 'Take Out Trash', category: 'Trash/Recycling', domain: 'home', defaultFrequency: { type: 'weekly', dayOfWeek: 0 }, icon: 'Trash2' },
  { id: 'home-recycling', name: 'Take Out Recycling', category: 'Trash/Recycling', domain: 'home', defaultFrequency: { type: 'weekly', dayOfWeek: 0 }, icon: 'Recycle' },
  { id: 'home-lawn-mow', name: 'Mow Lawn', category: 'Lawn Care', domain: 'home', defaultFrequency: { type: 'weekly', value: 2 }, icon: 'Scissors' },
  { id: 'home-house-cleaning', name: 'Deep House Cleaning', category: 'House Cleaning', domain: 'home', defaultFrequency: { type: 'monthly', value: 1 }, icon: 'Sparkles' },
  { id: 'home-pest-control', name: 'Pest Control Service', category: 'Pest Control', domain: 'home', defaultFrequency: { type: 'monthly', value: 3 }, icon: 'Bug' },
  { id: 'home-water-filter', name: 'Replace Water Filter', category: 'Water Filter Replacement', domain: 'home', defaultFrequency: { type: 'monthly', value: 6 }, icon: 'Droplet' },
  { id: 'home-hvac', name: 'HVAC Service', category: 'HVAC Service', domain: 'home', defaultFrequency: { type: 'yearly', value: 1 }, icon: 'Thermometer' },
  { id: 'home-hoa', name: 'Pay HOA', category: 'Bills', domain: 'home', defaultFrequency: { type: 'monthly', value: 1 }, icon: 'CreditCard' },
  { id: 'home-electricity', name: 'Pay Electricity', category: 'Bills', domain: 'home', defaultFrequency: { type: 'monthly', value: 1 }, icon: 'Zap' },
  { id: 'home-water', name: 'Pay Water', category: 'Bills', domain: 'home', defaultFrequency: { type: 'monthly', value: 1 }, icon: 'Droplets' },
  { id: 'home-internet', name: 'Pay Internet', category: 'Bills', domain: 'home', defaultFrequency: { type: 'monthly', value: 1 }, icon: 'Wifi' },

  // CAR DOMAIN
  { id: 'car-oil-change', name: 'Oil Change', category: 'Oil Change', domain: 'car', defaultFrequency: { type: 'monthly', value: 6 }, icon: 'Droplet' },
  { id: 'car-tire-rotation', name: 'Tire Rotation', category: 'Tire Rotation', domain: 'car', defaultFrequency: { type: 'monthly', value: 6 }, icon: 'Circle' },
  { id: 'car-emissions', name: 'Emissions Test', category: 'Emissions Test', domain: 'car', defaultFrequency: { type: 'yearly', value: 1 }, icon: 'TestTube' },
  { id: 'car-wash', name: 'Car Wash', category: 'Car Wash', domain: 'car', defaultFrequency: { type: 'monthly', value: 1 }, icon: 'Sparkles' },
  { id: 'car-insurance', name: 'Insurance Renewal', category: 'Insurance Renewal', domain: 'car', defaultFrequency: { type: 'yearly', value: 1 }, icon: 'Shield' },
  { id: 'car-registration', name: 'Registration Renewal', category: 'Registration Renewal', domain: 'car', defaultFrequency: { type: 'yearly', value: 1 }, icon: 'FileText' },
  { id: 'car-license', name: 'License Renewal', category: 'License Renewal', domain: 'car', defaultFrequency: { type: 'yearly', value: 5 }, icon: 'IdCard' },
  { id: 'car-service', name: 'General Service', category: 'General Service', domain: 'car', defaultFrequency: { type: 'monthly', value: 6 }, icon: 'Wrench' },
  { id: 'car-warranty', name: 'Warranty Tracking', category: 'Warranty Tracking', domain: 'car', defaultFrequency: { type: 'yearly', value: 1 }, icon: 'FileCheck' },

  // PET DOMAIN
  { id: 'pet-vaccination', name: 'Vaccination', category: 'Vaccinations', domain: 'pet', defaultFrequency: { type: 'yearly', value: 1 }, icon: 'Syringe' },
  { id: 'pet-heartworm', name: 'Heartworm Prevention', category: 'Heartworm Prevention', domain: 'pet', defaultFrequency: { type: 'monthly', value: 1 }, icon: 'Heart' },
  { id: 'pet-flea-tick', name: 'Flea & Tick Prevention', category: 'Flea & Tick Prevention', domain: 'pet', defaultFrequency: { type: 'monthly', value: 1 }, icon: 'Bug' },
  { id: 'pet-food', name: 'Food Refill', category: 'Food Refill Tracking', domain: 'pet', defaultFrequency: { type: 'monthly', value: 1 }, icon: 'BowlFood' },
  { id: 'pet-grooming', name: 'Grooming', category: 'Grooming', domain: 'pet', defaultFrequency: { type: 'custom', value: 6, unit: 'weeks' }, icon: 'Scissors' },
  { id: 'pet-vet', name: 'Vet Checkup', category: 'Vet Checkups', domain: 'pet', defaultFrequency: { type: 'yearly', value: 1 }, icon: 'Stethoscope' },
  { id: 'pet-medication', name: 'Medication', category: 'Medications', domain: 'pet', defaultFrequency: { type: 'daily', value: 1 }, icon: 'Pill' },
  { id: 'pet-supplements', name: 'Supplements', category: 'Supplements', domain: 'pet', defaultFrequency: { type: 'daily', value: 1 }, icon: 'Capsule' },

  // LIFE DOMAIN
  { id: 'life-subscription-netflix', name: 'Netflix Subscription', category: 'Subscriptions', domain: 'life', defaultFrequency: { type: 'monthly', value: 1 }, icon: 'Tv', defaultCost: 15.99 },
  { id: 'life-subscription-apple', name: 'Apple Subscription', category: 'Subscriptions', domain: 'life', defaultFrequency: { type: 'monthly', value: 1 }, icon: 'Apple', defaultCost: 9.99 },
  { id: 'life-subscription-spotify', name: 'Spotify Subscription', category: 'Subscriptions', domain: 'life', defaultFrequency: { type: 'monthly', value: 1 }, icon: 'Music', defaultCost: 10.99 },
  { id: 'life-rent', name: 'Pay Rent/Mortgage', category: 'Bills', domain: 'life', defaultFrequency: { type: 'monthly', value: 1 }, icon: 'Home' },
  { id: 'life-credit-card', name: 'Pay Credit Card', category: 'Bills', domain: 'life', defaultFrequency: { type: 'monthly', value: 1 }, icon: 'CreditCard' },
  { id: 'life-passport', name: 'Passport Renewal', category: 'Admin Documents', domain: 'life', defaultFrequency: { type: 'yearly', value: 10 }, icon: 'FileText' },
  { id: 'life-drivers-license', name: 'Driver\'s License Renewal', category: 'Admin Documents', domain: 'life', defaultFrequency: { type: 'yearly', value: 5 }, icon: 'IdCard' },
  { id: 'life-credit-score', name: 'Check Credit Score', category: 'Financial', domain: 'life', defaultFrequency: { type: 'monthly', value: 1 }, icon: 'TrendingUp' },
  { id: 'life-dental', name: 'Dental Checkup', category: 'Health', domain: 'life', defaultFrequency: { type: 'monthly', value: 6 }, icon: 'Smile' },
  { id: 'life-physical', name: 'Annual Physical', category: 'Health', domain: 'life', defaultFrequency: { type: 'yearly', value: 1 }, icon: 'Activity' },
  { id: 'life-password', name: 'Password Rotation', category: 'Digital Hygiene', domain: 'life', defaultFrequency: { type: 'monthly', value: 3 }, icon: 'Key' },
  { id: 'life-photo-cleanup', name: 'Photo Cleanup', category: 'Digital Hygiene', domain: 'life', defaultFrequency: { type: 'monthly', value: 6 }, icon: 'Image' },
  { id: 'life-anniversary', name: 'Anniversary', category: 'Important Dates', domain: 'life', defaultFrequency: { type: 'yearly', value: 1 }, icon: 'Heart' },
  { id: 'life-birthday', name: 'Birthday Reminder', category: 'Important Dates', domain: 'life', defaultFrequency: { type: 'yearly', value: 1 }, icon: 'Cake' },
];

