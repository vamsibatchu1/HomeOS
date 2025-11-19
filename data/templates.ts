import { TaskTemplate, Domain } from '@/types';

export const taskTemplates: TaskTemplate[] = [
  // HOME DOMAIN
  { id: 'home-air-filter', name: 'Change Air Filter', description: 'Replace HVAC air filter to maintain air quality and system efficiency', category: 'Air Filters', domain: 'home', defaultFrequency: { type: 'monthly', value: 3 }, icon: 'Wind' },
  { id: 'home-trash', name: 'Take Out Trash', description: 'Dispose of household waste and garbage', category: 'Trash/Recycling', domain: 'home', defaultFrequency: { type: 'weekly', dayOfWeek: 0 }, icon: 'Trash2' },
  { id: 'home-recycling', name: 'Take Out Recycling', description: 'Place recyclable materials in recycling bin for collection', category: 'Trash/Recycling', domain: 'home', defaultFrequency: { type: 'weekly', dayOfWeek: 0 }, icon: 'Recycle' },
  { id: 'home-lawn-mow', name: 'Mow Lawn', description: 'Cut and maintain lawn grass to keep yard looking neat', category: 'Lawn Care', domain: 'home', defaultFrequency: { type: 'weekly', value: 2 }, icon: 'Scissors' },
  { id: 'home-house-cleaning', name: 'Deep House Cleaning', description: 'Thorough cleaning of entire home including all rooms and surfaces', category: 'House Cleaning', domain: 'home', defaultFrequency: { type: 'monthly', value: 1 }, icon: 'Sparkles' },
  { id: 'home-pest-control', name: 'Pest Control Service', description: 'Schedule professional pest inspection and treatment', category: 'Pest Control', domain: 'home', defaultFrequency: { type: 'monthly', value: 3 }, icon: 'Bug' },
  { id: 'home-water-filter', name: 'Replace Water Filter', description: 'Install new water filter cartridge in refrigerator or filtration system', category: 'Water Filter Replacement', domain: 'home', defaultFrequency: { type: 'monthly', value: 6 }, icon: 'Droplet' },
  { id: 'home-hvac', name: 'HVAC Service', description: 'Annual maintenance check for heating and cooling system', category: 'HVAC Service', domain: 'home', defaultFrequency: { type: 'yearly', value: 1 }, icon: 'Thermometer' },
  { id: 'home-hoa', name: 'Pay HOA', description: 'Submit monthly homeowners association dues payment', category: 'Bills', domain: 'home', defaultFrequency: { type: 'monthly', value: 1 }, icon: 'CreditCard' },
  { id: 'home-electricity', name: 'Pay Electricity', description: 'Pay monthly electricity utility bill', category: 'Bills', domain: 'home', defaultFrequency: { type: 'monthly', value: 1 }, icon: 'Zap' },
  { id: 'home-water', name: 'Pay Water', description: 'Pay monthly water utility bill', category: 'Bills', domain: 'home', defaultFrequency: { type: 'monthly', value: 1 }, icon: 'Droplets' },
  { id: 'home-internet', name: 'Pay Internet', description: 'Pay monthly internet service provider bill', category: 'Bills', domain: 'home', defaultFrequency: { type: 'monthly', value: 1 }, icon: 'Wifi' },

  // CAR DOMAIN
  { id: 'car-oil-change', name: 'Oil Change', description: 'Replace engine oil and oil filter to maintain vehicle performance', category: 'Oil Change', domain: 'car', defaultFrequency: { type: 'monthly', value: 6 }, icon: 'Droplet' },
  { id: 'car-tire-rotation', name: 'Tire Rotation', description: 'Rotate tires to ensure even wear and extend tire life', category: 'Tire Rotation', domain: 'car', defaultFrequency: { type: 'monthly', value: 6 }, icon: 'Circle' },
  { id: 'car-emissions', name: 'Emissions Test', description: 'Complete annual vehicle emissions inspection and testing', category: 'Emissions Test', domain: 'car', defaultFrequency: { type: 'yearly', value: 1 }, icon: 'TestTube' },
  { id: 'car-wash', name: 'Car Wash', description: 'Clean exterior and interior of vehicle', category: 'Car Wash', domain: 'car', defaultFrequency: { type: 'monthly', value: 1 }, icon: 'Sparkles' },
  { id: 'car-insurance', name: 'Insurance Renewal', description: 'Renew auto insurance policy before expiration', category: 'Insurance Renewal', domain: 'car', defaultFrequency: { type: 'yearly', value: 1 }, icon: 'Shield' },
  { id: 'car-registration', name: 'Registration Renewal', description: 'Renew vehicle registration with DMV', category: 'Registration Renewal', domain: 'car', defaultFrequency: { type: 'yearly', value: 1 }, icon: 'FileText' },
  { id: 'car-license', name: 'License Renewal', description: 'Renew driver\'s license before expiration date', category: 'License Renewal', domain: 'car', defaultFrequency: { type: 'yearly', value: 5 }, icon: 'IdCard' },
  { id: 'car-service', name: 'General Service', description: 'Routine vehicle maintenance and inspection', category: 'General Service', domain: 'car', defaultFrequency: { type: 'monthly', value: 6 }, icon: 'Wrench' },
  { id: 'car-warranty', name: 'Warranty Tracking', description: 'Track vehicle warranty status and expiration dates', category: 'Warranty Tracking', domain: 'car', defaultFrequency: { type: 'yearly', value: 1 }, icon: 'FileCheck' },

  // PET DOMAIN
  { id: 'pet-vaccination', name: 'Vaccination', description: 'Schedule and administer required pet vaccinations', category: 'Vaccinations', domain: 'pet', defaultFrequency: { type: 'yearly', value: 1 }, icon: 'Syringe' },
  { id: 'pet-heartworm', name: 'Heartworm Prevention', description: 'Administer monthly heartworm prevention medication', category: 'Heartworm Prevention', domain: 'pet', defaultFrequency: { type: 'monthly', value: 1 }, icon: 'Heart' },
  { id: 'pet-flea-tick', name: 'Flea & Tick Prevention', description: 'Apply flea and tick prevention treatment to protect pet', category: 'Flea & Tick Prevention', domain: 'pet', defaultFrequency: { type: 'monthly', value: 1 }, icon: 'Bug' },
  { id: 'pet-food', name: 'Food Refill', description: 'Purchase and restock pet food supplies', category: 'Food Refill Tracking', domain: 'pet', defaultFrequency: { type: 'monthly', value: 1 }, icon: 'BowlFood' },
  { id: 'pet-grooming', name: 'Grooming', description: 'Schedule professional grooming appointment for pet', category: 'Grooming', domain: 'pet', defaultFrequency: { type: 'custom', value: 6, unit: 'weeks' }, icon: 'Scissors' },
  { id: 'pet-vet', name: 'Vet Checkup', description: 'Annual veterinary health examination and checkup', category: 'Vet Checkups', domain: 'pet', defaultFrequency: { type: 'yearly', value: 1 }, icon: 'Stethoscope' },
  { id: 'pet-medication', name: 'Medication', description: 'Administer daily prescribed medication to pet', category: 'Medications', domain: 'pet', defaultFrequency: { type: 'daily', value: 1 }, icon: 'Pill' },
  { id: 'pet-supplements', name: 'Supplements', description: 'Give daily nutritional supplements to pet', category: 'Supplements', domain: 'pet', defaultFrequency: { type: 'daily', value: 1 }, icon: 'Capsule' },

  // LIFE DOMAIN
  { id: 'life-subscription-netflix', name: 'Netflix Subscription', description: 'Monthly streaming service subscription payment', category: 'Subscriptions', domain: 'life', defaultFrequency: { type: 'monthly', value: 1 }, icon: 'Tv', defaultCost: 15.99 },
  { id: 'life-subscription-apple', name: 'Apple Subscription', description: 'Monthly Apple services subscription payment', category: 'Subscriptions', domain: 'life', defaultFrequency: { type: 'monthly', value: 1 }, icon: 'Apple', defaultCost: 9.99 },
  { id: 'life-subscription-spotify', name: 'Spotify Subscription', description: 'Monthly music streaming subscription payment', category: 'Subscriptions', domain: 'life', defaultFrequency: { type: 'monthly', value: 1 }, icon: 'Music', defaultCost: 10.99 },
  { id: 'life-rent', name: 'Pay Rent/Mortgage', description: 'Submit monthly rent or mortgage payment', category: 'Bills', domain: 'life', defaultFrequency: { type: 'monthly', value: 1 }, icon: 'Home' },
  { id: 'life-credit-card', name: 'Pay Credit Card', description: 'Pay monthly credit card statement balance', category: 'Bills', domain: 'life', defaultFrequency: { type: 'monthly', value: 1 }, icon: 'CreditCard' },
  { id: 'life-passport', name: 'Passport Renewal', description: 'Renew passport before expiration date', category: 'Admin Documents', domain: 'life', defaultFrequency: { type: 'yearly', value: 10 }, icon: 'FileText' },
  { id: 'life-drivers-license', name: 'Driver\'s License Renewal', description: 'Renew driver\'s license with DMV before expiration', category: 'Admin Documents', domain: 'life', defaultFrequency: { type: 'yearly', value: 5 }, icon: 'IdCard' },
  { id: 'life-credit-score', name: 'Check Credit Score', description: 'Review monthly credit score and report', category: 'Financial', domain: 'life', defaultFrequency: { type: 'monthly', value: 1 }, icon: 'TrendingUp' },
  { id: 'life-dental', name: 'Dental Checkup', description: 'Schedule and attend routine dental cleaning and examination', category: 'Health', domain: 'life', defaultFrequency: { type: 'monthly', value: 6 }, icon: 'Smile' },
  { id: 'life-physical', name: 'Annual Physical', description: 'Complete annual health checkup and physical examination', category: 'Health', domain: 'life', defaultFrequency: { type: 'yearly', value: 1 }, icon: 'Activity' },
  { id: 'life-password', name: 'Password Rotation', description: 'Update and rotate important account passwords for security', category: 'Digital Hygiene', domain: 'life', defaultFrequency: { type: 'monthly', value: 3 }, icon: 'Key' },
  { id: 'life-photo-cleanup', name: 'Photo Cleanup', description: 'Organize and delete unnecessary photos from devices', category: 'Digital Hygiene', domain: 'life', defaultFrequency: { type: 'monthly', value: 6 }, icon: 'Image' },
  { id: 'life-anniversary', name: 'Anniversary', description: 'Remember and celebrate important anniversary date', category: 'Important Dates', domain: 'life', defaultFrequency: { type: 'yearly', value: 1 }, icon: 'Heart' },
  { id: 'life-birthday', name: 'Birthday Reminder', description: 'Remember and celebrate important birthday', category: 'Important Dates', domain: 'life', defaultFrequency: { type: 'yearly', value: 1 }, icon: 'Cake' },
];
