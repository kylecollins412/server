import { z } from 'zod';

const TYPES = ['Sale', 'Rental', 'PG'] as const;

const CATEGORIES = [
	'Residential Apartment',
	'Independent House/Villa',
	'Plot',
	'Commercial Office',
	'Serviced Apartments',
	'1 RK/ Studio Apartment',
	'Independent/Builder Floor',
	'Other',
] as const;
const STATUS = ['Unfurnished', 'Semifurnished', 'Furnished'] as const;

const UNITS = [
	'Sq. Ft.',
	'Acre',
	'Gaj',
	'Marla',
	'Bigha',
	'Bigha-Pucca',
	'Bigha-Kachha',
	'Biswa',
	'Biswa-Pucca',
	'Kanal',
	'Killa',
	'Kattha',
	'Ghumaon',
] as const;

const POSSESSION = [
	'Immediate',
	'Between 1 Month',
	'Between 2 Month',
	'Between 3 Month',
	'Between 6 Months',
	'2023',
	'2024',
	'2025',
	'2026',
	'2027',
	'2028',
	'2029',
	'2030',
] as const;

const PURCHASE_TYPE = ['New Booking', 'Resale'] as const;

const CONSTRUCTION_STATUS = ['Ready to Move', 'Under Construction'] as const;

const DIRECTIONS = [
	'North',
	'South',
	'East',
	'West',
	'North-East',
	'North-West',
	'South-East',
	'South-West',
] as const;

export const createListingSchema = {
	body: z.object({
		title: z.string({ required_error: 'title is required' }),
		description: z.string({ required_error: 'description is required' }),
		price: z.string({ required_error: 'price is required' }),
		specialPrice: z.string().optional(),
		type: z.enum(TYPES),
		category: z.enum(CATEGORIES),
		status: z.enum(STATUS),
		size: z.string({ required_error: 'size is required' }),
		unit: z.enum(UNITS),
		bedroom: z.string().optional(),
		bathroom: z.string().optional(),
		openParking: z.string().optional(),
		closeParking: z.string().optional(),
		livingRoom: z.string().optional(),
		dinningRoom: z.string().optional(),
		store: z.string().optional(),
		poojaRoom: z.string().optional(),
		balcony: z.string().optional(),
		floor: z.string().optional(),
		direction: z.enum(DIRECTIONS).optional(),
		kitchen: z.string().optional(),
		otherFeatures: z.array(z.string()).optional(),
		address: z.string({ required_error: 'address is required' }),
		owner: z.string({ required_error: 'owner is required' }),
		ownerContact: z.string({ required_error: 'ownerContact is required' }),
		ownerId: z.string().optional(),
		lobby: z.string().optional(),
		commission: z.string({ required_error: 'commission is required' }),
		age: z.string().optional(),
		possession: z.enum(POSSESSION),
		purchaseType: z.enum(PURCHASE_TYPE).optional(),
		constructionStatus: z.enum(CONSTRUCTION_STATUS).optional(),
		location: z.string().optional(),
		locality: z.string({ required_error: 'locality is required' }),
		furnishingDetails: z.string().optional(),
		facilities: z.array(z.string()).optional(),
		security: z.string().optional(),
		maintenance: z.string().optional(),
	}),
};

export type CreateListingBody = z.TypeOf<typeof createListingSchema.body>;

export const getSingleListingSchema = {
	params: z.object({
		id: z.string({ required_error: 'id is required' }),
	}),
};

export type GetSingleListingParams = z.TypeOf<
	typeof getSingleListingSchema.params
>;

export const updateListingSchema = {
	body: z.object({
		title: z.string().optional(),
		description: z.string().optional(),
		price: z.string().optional(),
		specialPrice: z.string().optional(),
		type: z.enum(TYPES).optional(),
		category: z.enum(CATEGORIES).optional(),
		status: z.enum(STATUS).optional(),
		size: z.string().optional(),
		unit: z.enum(UNITS).optional(),
		bedroom: z.string().optional(),
		bathroom: z.string().optional(),
		openParking: z.string().optional(),
		closeParking: z.string().optional(),
		livingRoom: z.string().optional(),
		dinningRoom: z.string().optional(),
		store: z.string().optional(),
		poojaRoom: z.string().optional(),
		balcony: z.string().optional(),
		floor: z.string().optional(),
		direction: z.enum(DIRECTIONS).optional(),
		kitchen: z.string().optional(),
		otherFeatures: z.array(z.string()).optional(),
		address: z.string().optional(),
		owner: z.string().optional(),
		ownerContact: z.string().optional(),
		lobby: z.string().optional(),
		commission: z.string().optional(),
		age: z.string().optional(),
		possession: z.enum(POSSESSION).optional(),
		purchaseType: z.enum(PURCHASE_TYPE).optional(),
		constructionStatus: z.enum(CONSTRUCTION_STATUS).optional(),
		location: z.string().optional(),
		locality: z.string().optional(),
		furnishingDetails: z.string().optional(),
		facilities: z.array(z.string()).optional(),
		security: z.string().optional(),
		maintenance: z.string().optional(),
	}),

	params: z.object({
		id: z.string({ required_error: 'id is required' }),
	}),
};

export type UpdateListingBody = z.TypeOf<typeof updateListingSchema.body>;
export type UpdateListingParams = z.TypeOf<typeof updateListingSchema.params>;

export const deleteListingSchema = {
	params: z.object({
		id: z.string({ required_error: 'id is required' }),
	}),
};

export type DeleteListingParams = z.TypeOf<typeof deleteListingSchema.params>;

export const approveListingSchema = {
	params: z.object({
		id: z.string({ required_error: 'id is required' }),
	}),
};

export type ApproveListingParams = z.TypeOf<typeof approveListingSchema.params>;

export const deleteSpecificFileFromListingSchema = {
	params: z.object({
		key: z.string({ required_error: 'key is required' }),
		id: z.string({ required_error: 'id is required' }),
		type: z.string({ required_error: 'type is required' }),
	}),
};

export type DeleteSpecificFileFromListingParams = z.TypeOf<
	typeof deleteSpecificFileFromListingSchema.params
>;
