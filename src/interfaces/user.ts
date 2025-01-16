export interface UserData {
	id?: string;
	username: string;
	email: string;
	password: string;
	avatar?: string | null;
	accessToken?: string | null;
	refreshToken?: string | null;
	acceptedPolicy?: boolean | null;
	newsaletter?: boolean | null;
	role?: string | null;
	createdAt?: Date | null;
	updatedAt?: Date | null;
	status?: string | null;
}
