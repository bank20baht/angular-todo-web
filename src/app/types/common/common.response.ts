export type SuccessResponseWrap<T> = {
	status: SuccessHeaderResponse;
	result: T;
};

export type PaginatedResponse<T> = {
	status: {
		code: string;
		desc: string;
	};
	result: {
		items: T[];
		pageNumber: number;
		pageSize: number;
		totalCount: number;
		totalPages: number;
	};
};

export type SuccessHeaderResponse = {
	code: string;
	desc: string;
};
